import hashlib
import json
import os
from flask import Flask, jsonify, redirect, render_template, request, url_for
import pymysql
from database import db
from utils.Validations import validateFormD, validateFormP
from werkzeug.utils import secure_filename
import filetype

UPLOAD_FOLDER = 'static/upload'

app = Flask(__name__)
app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000
app.config['JSON_AS_ASCII'] = False

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('database/querys.json', 'r') as querys:
	QUERY_DICT = json.load(querys)

def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn

#http://localhost

#Rutas de la aplicación
#http://localhost/
@app.route("/")
def index():
    donacion = request.args.get('donacion')
    pedido = request.args.get('pedido')
    return render_template("inicio.html", donacion=donacion, pedido=pedido)

#http://localhost/ver-donaciones
@app.route("/ver-donaciones")
def ver_donaciones():
    #vemos en que pagina estamos
    pagina_actual = request.args.get("pagina", default=1, type=int) #sino tiene estamos en la pagina uno
    #ver indices para llamar a la consulta
    inicio = (pagina_actual-1)*5
    fin = inicio + 6
    #traer 6 donaciones
    seis_donaciones = db.get_donaciones(inicio,fin)
    #si hay 6 se mostrará el boton de siguiente en el HTML
    siguiente = len(seis_donaciones) > 5
    #mostrar las 5
    donaciones = seis_donaciones[:5]
    data = []
    for ped in donaciones: #primeros 5
        don_id, comuna_id, _, tipo, cantidad, fecha, _, _, nombre, _, _, = ped
        comunas = db.get_comuna(comuna_id)
        solo_fecha = fecha.strftime('%Y-%m-%d')
        fotos = []
        for foto in db.get_fotos(don_id):
           foto_id, _, nombre_foto, _ = foto
           fotos.append({
               "id":foto_id,
               "ruta": url_for('static',filename=f"upload/{nombre_foto}")
           })
        data.append({
            "id":don_id,
            "comuna":comunas,
            "tipo":tipo,
            "cantidad":cantidad,
            "fecha":solo_fecha,
            "nombre":nombre,
            "foto": fotos
        })

    return render_template("ver-donaciones.html", data = data, pagina_actual = pagina_actual, siguiente = siguiente)

#http://localhost/ver-pedidos
@app.route("/ver-pedidos")
def ver_pedidos():
    #vemos en que pagina estamos
    pagina_actual = request.args.get("pagina", default=1, type=int) #sino tiene estamos en la pagina uno
    #ver indices para llamar a la consulta
    inicio = (pagina_actual-1)*5
    fin = inicio + 6
    #traer 6 pedidos
    seis_pedidos = db.get_pedidos(inicio,fin)
    #si hay 6 se mostrará el boton de siguiente en el HTML
    siguiente = len(seis_pedidos) > 5
    #mostrar las 5
    pedidos = seis_pedidos[:5]
    #data tendra cada pedido
    data = []
    print(pagina_actual)
    print(siguiente)
    for ped in pedidos: #primeros 5
        ped_id, comuna_id, tipo, descripcion, cantidad, nombre, _, _, = ped
        comunas = db.get_comuna(comuna_id)
        data.append({
            "id":ped_id,
            "comuna":comunas,
            "tipo":tipo,
            "descripcion":descripcion,
            "cantidad":cantidad,
            "nombre":nombre
        })
    

    return render_template("ver-pedidos.html", data = data, pagina_actual = pagina_actual, siguiente = siguiente)

@app.route('/obtener_comunas/<region_id>')
def obtener_comunas(region_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute('SELECT id, nombre FROM comuna WHERE region_id = %s', (region_id,))
    comunas = cursor.fetchall()
    return jsonify({'comunas': comunas})


#http://localhost/agregar-donacion
@app.route("/agregar-donacion", methods=('GET', 'POST'))
def agregar_donacion():
    error = None
    select_region = db.get_regiones() 
    if request.method == "POST":
        region = request.form.get("region")
        comuna = request.form.get("comuna")
        calle_numero = request.form.get("calle-numero")
        tipo = request.form.get("tipo")
        cantidad = request.form.get("cantidad")
        fecha_disponibilidad = request.form.get("fecha-disponibilidad")
        descripcion = request.form.get("descripcion")
        condiciones = request.form.get("condiciones")
        foto_1 = request.files.get("foto-1")
        foto_2 = request.files.get("foto-2")
        foto_3 = request.files.get("foto-3")
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        celular = request.form.get("celular")
        error = validateFormD(region, comuna, calle_numero, tipo, cantidad, fecha_disponibilidad, nombre, email, celular, foto_1, request.files.get("foto-2"), request.files.get("foto-3"))
        # Si no hay error avanzamos
        if error == None:
            # Insertar donacion
            don_id = db.donacion(comuna, calle_numero, tipo, cantidad, fecha_disponibilidad, descripcion, condiciones, nombre, email, celular)
            fotos = [foto_1, foto_2, foto_3]
            for foto in fotos:
                if(not foto):
                    pass
                else:
                    _filename = hashlib.sha256(
                        secure_filename(foto.filename).encode("utf-8")
                        ).hexdigest()
                    _extension = filetype.guess(foto).extension
                    # Nombre del archivo
                    img_filename = f"{_filename}.{_extension}"
                    # Guardar archivo
                    foto.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))
                    # Ruta de la foto
                    ruta = os.path.join(app.config['UPLOAD_FOLDER'], img_filename)
                    ruta = ruta.replace('\\', '/')
                    # Guardar las fotos
                    db.create_foto(ruta, img_filename, don_id) #guardar la foto
            # Despues de guardar la donacion y la/s foto/s se va a index sin antes guardar el mensaje de exito
            #flash("Donación agregada exitosamente", "success")
            return redirect(url_for('index', donacion=True))
            
        # Si hay error se mostrará el error en el html

    return render_template("agregar-donacion.html", error = error, select_region = select_region )

#http://localhost/agregar-pedido
@app.route("/agregar-pedido", methods=('GET', 'POST'))
def agregar_pedido():
    error = None
    select_region = db.get_regiones() 
    if request.method == "POST":
        region = request.form.get("region")
        comuna = request.form.get("comuna")
        tipo = request.form.get("tipo")
        descripcion = request.form.get("descripcion")
        cantidad = request.form.get("cantidad")
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        celular = request.form.get("celular")
        error = validateFormP(region, comuna, tipo, descripcion, cantidad, nombre, email, celular)
        if error == None:
            if db.pedido(comuna, tipo, descripcion, cantidad, nombre, email, celular):
                return redirect(url_for('index', pedido=True))

    return render_template("agregar-pedido.html", error = error, select_region = select_region)

#http://localhost/informacion-donacion
@app.route("/informacion-donacion")
def informacion_donacion():
    donacion_id = request.args.get("id")
    data = []
    don_id, comuna_id, calle, tipo, cantidad, fecha, descripcion, condiciones, nombre, email, celular = db.get_donacion(donacion_id)
    comunas = db.get_comuna(comuna_id)
    region = db.nombre_region(comuna_id)
    solo_fecha = fecha.strftime('%Y-%m-%d')
    fotos = []
    for foto in db.get_fotos(donacion_id):
       foto_id, _, nombre_foto, _ = foto
       fotos.append({
           "id":foto_id,
           "ruta": url_for('static',filename=f"upload/{nombre_foto}")
       })
    data.append({
        "id":don_id,
        "region":region,
        "comuna":comunas,
        "calle":calle,
        "tipo":tipo,
        "cantidad":cantidad,
        "fecha":solo_fecha,
        "descripcion":descripcion,
        "condiciones":condiciones,
        "foto":fotos,
        "nombre":nombre,
        "email":email,
        "celular":celular
    })
    return render_template("informacion-donacion.html", data = data)

#http://localhost/informacion-pedido
@app.route("/informacion-pedido")
def informacion_pedido():
    pedido_id = request.args.get("id")
    data = []
    ped_id, comuna_id, tipo, descripcion, cantidad, nombre, email, celular = db.get_pedido(pedido_id)
    comunas = db.get_comuna(comuna_id)
    region = db.nombre_region(comuna_id)
    data.append({
        "id":ped_id,
        "region":region,
        "comuna":comunas,
        "tipo":tipo,
        "descripcion":descripcion,
        "cantidad":cantidad,
        "nombre":nombre,
        "email":email,
        "celular":celular
    })
    return render_template("informacion-pedido.html",data = data)