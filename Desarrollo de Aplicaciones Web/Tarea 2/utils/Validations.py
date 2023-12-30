import re
from datetime import datetime
import filetype

# VALIDACIÓN PARA EL FORMULARIO DE AGREGAR DONACIÓN

# Primero se crean todas las funciones validar
def validateRegion(region):
    # Para probar que es obligatorio escoger una opcion
    if region == "":
        return False
    return True

def validateComuna(comuna):
    # Para probar que es obligatorio escoger una opcion
    if comuna == "10001":
        return False
    return True

def validateCalleYnumero(calle):
    # Para probar que es obligatorio
    if not calle:
        return False
    return True

def validateTipo(tipo):
    # Para probar que es obligatorio escoger una opcion
    if not tipo: #""
        return False
    return True

def validateCantidad(cantidad):
    # Para probar que es obligatorio
    if not cantidad:
        return False
    return True

def validateFecha(fecha):
    # Para probar que es obligatorio
    if not fecha:
        return False

    # Para probar el formato
    formatValid = bool(re.match(r'^\d{4}-\d{2}-\d{2}$', fecha))

    # Para probar que la fecha escrita sea mayor o igual a la actual
    fecha1 = datetime.strptime(fecha, '%Y-%m-%d').date()
    fechaActual = datetime.now().date()
    mayorValid = fecha1 >= fechaActual

    # Ver si se cumplen ambos requisitos
    return formatValid and mayorValid

def validateFile1(files):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}

    # Para probar que es obligatorio
    if files is None:
        return False
    
    # check if the browser submitted an empty file
    if files.filename == "":
        return False

    # check file extension
    ftype_guess = filetype.guess(files)
    if ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    # check mimetype
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        return False
    return True

# Otra funcion para validar el archivo porque esta se usará para los archivos que no son obligatorios (foto-2, foto-3)
def validateFile2(files):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}
    
    # Mirar si se subio o no el archivo
    if not files:
        return True
    else:
        # Si el archivo esta vacio
        if files.filename == "":
            return False

        # Mirar las extensiones
        ftype_guess = filetype.guess(files)
        if ftype_guess.extension not in ALLOWED_EXTENSIONS:
            return False
        # chequear mimetype
        if ftype_guess.mime not in ALLOWED_MIMETYPES:
            return False
        return True

def validateNombre(nombre):
    # Para probar que es obligatorio
    if not nombre:
        return False

    # Para ver si cumple las condiciones de largo correspondientes
    lengthValid = len(nombre) > 3 and len(nombre) < 80

    # Ver si se cumple el requisito
    return lengthValid

def validateEmail(email):
    # Para probar que es obligatorio
    if not email:
        return False

    # Para asegurar que sea del formato correcto
    re_format = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$'
    formatValid = bool(re.match(re_format, email))

    # Ver si se cumple el requisito
    return formatValid

def validateCelular(celular):
    # Como es opcional, si no se coloca uno igual estaría valido
    if not celular:
        return True

    # Para confirmar que sea del largo correcto
    lengthValid = len(celular) == 12

    # Para asegurar que sea del formato correcto
    re_format = r'^\+569[0-9]{8}$'
    formatValid = bool(re.match(re_format, celular))

    # Ver si se cumplen ambos requisitos
    return lengthValid and formatValid

# Para ver si el formulario cumple con todo lo solicitado
def validateFormD(region, comuna, calle, tipo, cantidad, fechaD, nombre, email, celular,foto1,foto2,foto3):
    # Variables auxiliares que se usaran para ver cual/es variable/s cumplen o no cumples los requisitos
    invalidInputs = []
    isValid = True

    def setInvalidInput(inputName): #revisar
        nonlocal invalidInputs
        nonlocal isValid
        invalidInputs.append(inputName)
        isValid = isValid and False
    
    # Si cumplen o no los requisitos solicitados
    if not validateRegion(region):
        setInvalidInput('Region')

    if not validateComuna(comuna):
        setInvalidInput('Comuna')

    if not validateCalleYnumero(calle):
        setInvalidInput('Calle y numero')

    if not validateTipo(tipo):
        setInvalidInput('Tipo de donacion')

    if not validateCantidad(cantidad):
        setInvalidInput('Cantidad')

    if not validateFecha(fechaD):
        setInvalidInput('Fecha de disponibilidad')
        
    if not validateNombre(nombre):
        setInvalidInput('Nombre del donante')

    if not validateEmail(email):
        setInvalidInput('Email')

    if not validateCelular(celular):
        setInvalidInput('Celular')

    if not validateFile1(foto1):
        setInvalidInput('Primera foto')

    if not validateFile2(foto2):
        setInvalidInput('Segunda foto')
        
    if not validateFile2(foto3):
        setInvalidInput('tercera foto')

    if not isValid:
        error = "Error en el campo: " + ",".join(invalidInputs)
        return error
    else:
        error = None
        return error
    

# VALIDACIÓN PARA EL FORMULARIO DE AGREGAR PEDIDO

# Primero se crean todas las funciones validar
def validateRegion(region):
    # Para probar que es obligatorio escoger una opcion
    if region == "":
        return False
    return True

def validateComuna(comuna):
    # Para probar que es obligatorio escoger una opcion
    if comuna == "10001":
        return False
    return True

def validateTipo(tipo):
    # Para probar que es obligatorio escoger una opcion
    if tipo == "":
        return False
    return True

def validateDescripcion(descripcion):
    # Para probar que es obligatorio
    if not descripcion:
        return False

    # Para ver si cumple la condición del largo
    lengthValid = len(descripcion) < 250

    # Ver si se cumple el requisito
    return lengthValid

def validateCantidad(cantidad):
    # Para probar que es obligatorio
    if not cantidad:
        return False
    return True

def validateNombre(nombre):
    # Para probar que es obligatorio
    if not nombre:
        return False

    # Para ver si cumple las condiciones de largo correspondientes
    lengthValid = len(nombre) > 3 and len(nombre) < 80

    # Ver si se cumple el requisito
    return lengthValid

def validateEmail(email):
    # Para probar que es obligatorio
    if not email:
        return False

    # Para asegurar que sea del formato correcto
    re_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$"
    formatValid = bool(re.match(re_pattern, email))

    # Ver si se cumple el requisito
    return formatValid

def validateCelular(celular):
    # Como es opcional, si no se coloca uno igual estaría valido
    if not celular:
        return True

    # Para confirmar que sea del largo correcto
    lengthValid = len(celular) == 12

    # Para asegurar que sea del formato correcto
    re_pattern = r"^[+]569+[0-9]{8}$"
    formatValid = bool(re.match(re_pattern, celular))

    # Ver si se cumplen ambos requisitos
    return lengthValid and formatValid

# Para ver si el formulario cumple con todo lo solicitado
def validateFormP(region, comuna, tipo, descripcion, cantidad, nombre, email, celular):
    # Variables auxiliares que se usaran para ver cual/es variable/s cumplen o no cumples los requisitos
    invalidInputs = []
    isValid = True
    def setInvalidInput(inputName):
        nonlocal invalidInputs, isValid
        invalidInputs.append(inputName)
        isValid = isValid and False

    # Si cumplen o no los requisitos solicitados
    if not validateRegion(region):
        setInvalidInput("Region")

    if not validateComuna(comuna):
        setInvalidInput("Comuna")

    if not validateTipo(tipo):
        setInvalidInput("Tipo de donacion")

    if not validateDescripcion(descripcion):
        setInvalidInput("Descripcion del pedido")

    if not validateCantidad(cantidad):
        setInvalidInput("Cantidad")

    if not validateNombre(nombre):
        setInvalidInput("Nombre del donante")

    if not validateEmail(email):
        setInvalidInput("Email")

    if not validateCelular(celular):
        setInvalidInput("Celular")
    
    if not isValid:
        error = "Error en el campo: " + ",".join(invalidInputs)
        return error
    else:
        error = None
        return error
