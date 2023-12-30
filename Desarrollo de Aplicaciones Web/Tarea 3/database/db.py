import json
from colorama import Cursor
import pymysql

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

# Obtener regiones
def get_regiones():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["obtener_regiones"])
	region = cursor.fetchall()
	return region

# Crear donacion y pedido
def create_donacion(comuna_id, calle_numero, tipo, cantidad, fecha_disponibilidad, descripcion, condiciones_retirar, nombre, email, celular):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["crear_donacion"], (comuna_id, calle_numero, tipo, cantidad, fecha_disponibilidad, descripcion, condiciones_retirar, nombre, email, celular))
	last_id = cursor.lastrowid
	conn.commit()
	return last_id

def create_pedido(comuna_id, tipo, descripcion, cantidad, nombre_solicitante, email_solicitante, celular_solicitante):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["crear_pedido"], (comuna_id, tipo, descripcion, cantidad, nombre_solicitante, email_solicitante, celular_solicitante))
	conn.commit()

def donacion(comuna_id, calle_numero, tipo, cantidad, fecha_disponibilidad, descripcion, condiciones_retirar, nombre, email, celular):
	don_id = create_donacion(comuna_id, calle_numero, tipo, cantidad, fecha_disponibilidad, descripcion, condiciones_retirar, nombre, email, celular)
	return don_id

def pedido(comuna_id, tipo, descripcion, cantidad, nombre_solicitante, email_solicitante, celular_solicitante):
	create_pedido(comuna_id, tipo, descripcion, cantidad, nombre_solicitante, email_solicitante, celular_solicitante)
	return True

# Obtener 6 pedidos
def get_pedidos(inicio, fin):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["obtener_pedidos"], (inicio,fin))
	pedidos = cursor.fetchall()
	return pedidos

# Obtener la comuna
def get_comuna(comuna_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["nombre_comuna"], (comuna_id,))
	comuna1 = cursor.fetchone()
	return comuna1[0]

# Obtener un pedido
def get_pedido(pedido_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["obtener_pedido"], (str(pedido_id,)))
	pedido = cursor.fetchone()
	return pedido

# Obtener id de la region
def get_region_id(comuna_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["comuna_region_id"], (comuna_id,))
	comuna1 = cursor.fetchone()
	return comuna1[0]

# Obtener la region
def get_region(region_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["nombre_region"], (region_id,))
	region1 = cursor.fetchone()
	return region1[0]

# Obtener el nombre de la region	
def nombre_region(comuna_id):
	region_id = get_region_id(comuna_id)
	nombre = get_region(region_id)
	return nombre

# Obtener las donaciones
def get_donaciones(inicio, fin):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["obtener_donaciones"], (inicio,fin))
	donaciones = cursor.fetchall()
	return donaciones

# Obtener una donacion
def get_donacion(donacion_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["obtener_donacion"], (str(donacion_id,)))
	donacion = cursor.fetchone()
	return donacion

# Crear una foto
def create_foto(ruta_archivo, nombre_archivo, donacion_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["subir_foto"], (ruta_archivo, nombre_archivo, donacion_id))
	conn.commit()

# Obtener las fotos de la donacion
def get_fotos(donacion_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["obtener_foto"], (str(donacion_id,)))
	fotos = cursor.fetchall()
	return fotos

# Obtener las últimas 5 donaciones
def get_5_donaciones():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["siguientes_donaciones"])
	donaciones = cursor.fetchall()
	return donaciones

# Obtener los últimos 5 pedidos
def get_5_pedidos():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["siguientes_pedidos"])
	donaciones = cursor.fetchall()
	return donaciones

# Obtener la cantidad de donaciones según su tipo
def get_donaciones_total(tipo):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["donacion_tipo"], (str(tipo,)))
	total = cursor.fetchone()
	return total

# Obtener la cantidad de pedidos según su tipo
def get_pedidos_total(tipo):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["pedido_tipo"], (str(tipo,)))
	total = cursor.fetchone()
	return total