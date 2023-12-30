// Primero se crean todas las funciones validar
const validateRegion = (region) => {
  // Para probar que es obligatorio escoger una opcion
  if (region == "") return false;
  return true;
};

const validateComuna = (comuna) => {
  // Para probar que es obligatorio escoger una opcion
  if (comuna == 10001) return false;
  return true;
};

const validateCalleYnumero = (calle) => {
  // Para probar que es obligatorio
  if (!calle) return false;
  return true;
};

const validateTipo = (tipo) => {
  // Para probar que es obligatorio escoger una opcion
  if (tipo == "") return false;
  return true;
};

const validateCantidad = (cantidad) => {
  // Para probar que es obligatorio
  if (!cantidad) return false;
  return true;
};

const validateFecha = (fecha) => {
  // Para probar que es obligatorio
  if (!fecha) return false;

  // Para probar el formato 
  let correcto = true;
  let re = /^\d{4}-\d{2}-\d{2}$/;
  let formatValid = re.test(fecha);
  let isGood = correcto && formatValid;

  // Para probar que la fecha escrita sea mayor o igual a la actual
  const [ano, mes, dia] = fecha.split('-');
  let fecha1 = new Date(ano,mes-1,dia);
  let fechaActual = new Date();
  let mayorValid = fecha1.getTime() > fechaActual.getTime() || fecha1.toDateString() === fechaActual.toDateString();

  // Ver si se cumplen ambos requisitos 
  return isGood && mayorValid;
};

const validateFile1 = (files) => {
  // Para probar que es obligatorio
  if (!files) return false;

  // Para confirmar que se suba solo un archivo
  let lengthValid = 1 == files.length;

  // Para asegurar que sea del formato correcto
  let typeValid = true;
  for (const file of files) {
    // El tipo de archivo tiene que ser "image/<foo>" or "application/pdf"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image" || file.type == "application/pdf";
  }

  // Ver si se cumplen ambos requisitos
  return lengthValid && typeValid;
};

// Otra funcion para validar el archivo porque esta se usará para los archivos que no son obligatorios (foro-2, foto-3)
const validateFile2 = (files) => {
  // Para confirmar que se suba solo un archivo
  let lengthValid = 1 == files.length || 0 == files.length;

  // Para asegurar que sea del formato correcto
  let typeValid = true;
  for (const file of files) {
    // El tipo de archivo tiene que ser "image/<foo>" or "application/pdf"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image" || file.type == "application/pdf";
  }

  // Ver si se cumplen ambos requisitos
  return lengthValid && typeValid;
};

const validateNombre = (nombre) => {
  // Para probar que es obligatorio
  if (!nombre) return false;

  // Para ver si cumple las condiciones de largo correspondientes
  let lengthValid = nombre.length > 3 && nombre.length < 80;

  // Ver si se cumple el requisito
  return lengthValid;
};

const validateEmail = (email) => {
  // Para probar que es obligatorio
  if (!email) return false;

  // Para asegurar que sea del formato correcto
  let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
  let formatValid = re.test(email);

  // Ver si se cumple el requesito
  return formatValid;
};

const validateCelular = (celular) => {
  // Como es opcional, si no se coloca uno igual estaría valido
  if (!celular) return true;

  // Para confirmar que sea del largo correcto
  let lengthValid = celular.length == 12;

  // Para asegurar que sea del formato correcto
  let re = /^[+]569+[0-9]{8}$/;
  let formatValid = re.test(celular);

  // Ver si se cumplen ambos requisitos
  return lengthValid && formatValid;
};

// Para ver si el formulario cumple con todo lo solicitado
const validateForm = () => {
  let myForm = document.forms["tmAgregarDonacionForm"];
  let region = myForm["region"].value;
  let comuna = myForm["comuna"].value;
  let calle = myForm["calle-numero"].value;
  let tipo = myForm["tipo"].value;
  let cantidad = myForm["cantidad"].value;
  let fechaD = myForm["fecha-disponibilidad"].value;
  let file1 = myForm["foto-1"].files; 
  let file2 = myForm["foto-2"].files; 
  let file3 = myForm["foto-3"].files; 
  let nombre = myForm["nombre"].value;
  let email = myForm["email"].value;
  let celular = myForm["celular"].value;

  // Variables auxiliares que se usaran para ver cual/es variable/s cumplen o no cumples los requisitos
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  // Si cumplen o no los requisitos solicitados
  if (!validateRegion(region)) {
    setInvalidInput("Region");
  }
  if (!validateComuna(comuna)) {
    setInvalidInput("Comuna");
  }
  if (!validateCalleYnumero(calle)) {
    setInvalidInput("Calle y numero");
  }
  if (!validateTipo(tipo)) {
    setInvalidInput("Tipo de donacion");
  }
  if (!validateCantidad(cantidad)) {
    setInvalidInput("Cantidad");
  }
  if (!validateFecha(fechaD)) {
    setInvalidInput("Fecha de disponibilidad");
  }
  if (!validateFile1(file1)) {
    setInvalidInput("Picture1");
  }
  if (!validateFile2(file2)) {
    setInvalidInput("Picture2");
  }
  if (!validateFile2(file3)) {
    setInvalidInput("Picture3");
  }
  if (!validateNombre(nombre)) {
    setInvalidInput("Nombre del donante");
  }
  if (!validateEmail(email)) {
    setInvalidInput("Email");
  }
  if (!validateCelular(celular)) {
    setInvalidInput("Celular");
  }

  // Se mostraran las celdas que no cumplieron los requisitos
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");

  if (!isValid) {
    validationListElem.textContent = "";
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }

    // Se hace visible el div que contendrá los campos invalidos
    validationBox.hidden = false;
  } else {
    
    // Código para mostrar los siguientes dos cuadros pedidos (confirmacion y aprobación). Se usa la biblioteca SweetAlert2 para los cuadros de diálogo.
    var formularioValido = true;

    if (formularioValido) {
      // Se muestra el primer cuadro de diálogo para ver la confirmacion del formulario por parte del cliente.
      Swal.fire({
        title: '¿Confirma que desea agregar esta donación?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmo',
        cancelButtonText: 'No, quiero volver al formulario',
        confirmButtonColor: '#f7505a',
        cancelButtonColor: '#f7505a',
      }).then((result) => {
        if (result.isConfirmed) {
          // Código a ejecutar si se confirma la información, es decir, mostrar el siguiente cuadro.
          Swal.fire({
            title: 'Éxito',
            text: 'Hemos recibido la información de su donación. Muchas gracias.',
            icon: 'success'
          }).then(() => {
            // Redirigimos a la página de inicio después de mostrar el mensaje de éxito
            window.location.href = 'inicio.html';
          });
        } else {
          // Si se escoge "No, quiero volver al formulario", se mantiene en la misma página.
        }
      });
    }
  }
};

// Se crea el evento para el boton
let botonAgregarDonacion = document.getElementById("submitAD");
botonAgregarDonacion.addEventListener("click", validateForm);
