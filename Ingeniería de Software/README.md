# Descripción del proyecto

Para este proyecto "Aplicación" se tiene una carpeta para los archivos .html, estos están en  "templates", también una carpeta con los archivos JavaScript la cual está en "static\js" y afuera los archivos base como "models.py", "form.py", "views.py" y "urls.py". No se explicará la lógica de los archivos .hmtl ni de los .js, pero si de los archivos base del proyecto.

## models.py

tiene todos los modelos que son los objetos de la base de datos, donde hay clase usuario que es hijo de la clase AbstractUser que está por default en Django, tambié está la clase Transaccion la cual posee los siguientes atributos:

- Id: número único de la transacción que es la llave.
- owner: Es una llave foránea que hace referencia al usuario dueño de la transacción.
- description: Descripción de la transacción, principalmente en que tienda fue realizada.
- amount: Costo de la transacción.
- date: Fecha de la transacción, está en formato "date".
- category: Un string que dice en que categoría está la transacción, la cual puede ser "Entretención", "Otros", "Casa", "Transferencia", estas opciones están en una variable global llamda "options".

## form.py

Posee los forms para las distintas funciones, como la de registrarse, la de loguearse y la de una transacción. Estos forms sirven para hacer más ameno el trabajo en el html, ya que se le pueden dar parametros especiales, tales como el widget o el required.

## views.py

Es el controlador que conecta models.py con los html y también utiliza la información de los forms.
Todas las funciones tienen un método "GET" y otro "POST" y estas manegan toda la lógica de la aplicación. 

- Registro: se tiene la creación del usuario con los datos obtenidos desde el form y la posterior creación y guardado del objeto en al base de datos. 

- Login: Se verifica que el usuario sea válido, es decir, que esté en la base de datos, para luego dejarlo como el usuario actual para que no se tenga que loguear cada vez que recargue la página. También hay una excepción si es que se inserta mal el usuario o al contraseña.

- Index: Calcula el saldo total gracias a todas las transacciones del usuario y renderiza la página principal de la aplicaciíon.

- Logout: Cierra la sesión del usuario.

- Transaction: Es la creación de una transacción, teniendo el cuidado que debe sacar el atributo "type" que es añadido en un javaScript para explicitar si la transacción es un egreso o un ingreso, se pudo haber puesto en la base de datos pero también funciona de esta forma.

- Edit Transaction: Permite editar una transacción, actualizando todos los campos gracias a los datos traidos por el form.

- Filter Transaction: Trae los datos de la categoría a filtrar y la fecha desde y hasta desde un JSON, filtra las transacciones por estos valores y retorna una respuesta JSON con lso datos de las transacciones serializados.

- Delete Transaction: Elimina la transacción de la base de datos, gracias a la función "delete" que viene en Django.


## urls.py

Posee todas las rutas de la página web, tales como el login, el register y demás acciones que son accionadas desde views.py


# Pasos para ejecutar el proyecto

Basta con estar en la carpeta del proyecto en una terminal y realizar el comando:

-- python manage.py runserver

y luego en el navegador accerder a al dirección url: http://127.0.0.1:8000/ la cúal si no se está logueado, llevará al usuario al login, donde tendrá la opción de registrarse si es que no tiene cuenta. 

Una ves accedido a la página principal, verá su saldo en grande con un botón con forma de ojo, que servirá para ocultar o mostrar el monto del saldo de la cuenta. Más abajo verá los filtros disponibles ordenados horizontalmente, con fecha desde y hasta y una categoría a alegir. Finalmente más abajo la lista de transacciones, con su monto a la derecha (verde si es ingreso y rojo si es egreso) y la izquierda los botones para editar y borrar.








