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

const validateTipo = (tipo) => {
  // Para probar que es obligatorio escoger una opcion
  if (tipo == "") return false;
  return true;
};

const validateDescripcion = (descripcion) => {
  // Para probar que es obligatorio 
  if (!descripcion) return false;

  // Para ver si cumple la condición de largo correspondiente
  let lengthValid = descripcion.length < 250;

  // Ver si se cumple el requisito
  return lengthValid;
};

const validateCantidad = (cantidad) => {
  // Para probar que es obligatorio 
  if (!cantidad) return false;
  return true;
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

// Luego, ver si el formulario cumple con todo lo solicitado
const validateForm = () => {
  let myForm = document.forms["tmAgregarPedidoForm"];
  let region = myForm["region"].value;
  let comuna = myForm["comuna"].value;
  let tipo = myForm["tipo"].value;
  let descripcion = myForm["descripcion"].value;
  let cantidad = myForm["cantidad"].value;
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
  if (!validateTipo(tipo)) {
    setInvalidInput("Tipo de donacion");
  }
  if (!validateDescripcion(descripcion)) {
    setInvalidInput("Descripcion del pedido");
  }
  if (!validateCantidad(cantidad)) {
    setInvalidInput("Cantidad");
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
        title: '¿Confirma que desea agregar este pedido?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmo',
        cancelButtonText: 'No, quiero volver al formulario',
        confirmButtonColor: '#f7505a',
        cancelButtonColor: '#f7505a',
      }).then((result) => {
        if (result.isConfirmed) {
          // Código a ejecutar si se confirma la información ("Sí, confirmo"), es decir, mostrar el siguiente cuadro.
          Swal.fire({
            title: 'Éxito',
            text: 'Hemos recibido la información de su pedido. Muchas gracias.',
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
let botonAgregarPedido = document.getElementById("submitAP");
botonAgregarPedido.addEventListener("click", validateForm);
