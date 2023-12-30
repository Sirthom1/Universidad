// First, create all the validation functions
const validateUser = (user) => {
    // To verify that it is necessary
    if (!user) return false;
  
    // To check if it meets the required length conditions
    let lengthValid = user.length > 3 && user.length < 80;
    
    // To check if the requirement is met
    return lengthValid;
  };
const validateEmail = (email) => {
  // To verify that it is necessary
  if (!email) return false;

  // To ensure it is in the correct format
  let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
  let formatValid = re.test(email);

  // To check if the requirement is met
  return formatValid;
};

const validatePassword = (password) => {
  // To verify that it is necessary
  if (!password) return false;
  return true;
};

const validateRepeatPassword = (password, repeatPassword) => {
    // To verify that it is necessary
    if (!password) return false;
  
    // To check that they are the same
    if (password !== repeatPassword) return false;
    return true;
};
  
// Then, check if the form meets all the requirements
const validateForm = () => {                
  let myForm = document.forms["RegisterForm"];
  let user = myForm["user_input"].value;
  let email = myForm["email_input"].value;
  let password = myForm["password_input"].value;
  let repeatpassword = myForm["repeatPassword_input"].value;

  // Auxiliary variables that will be used to see which variable/s meet or do not meet the requirements
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  // If the requested requirements are met or not
  if (!validateUser(user)) {
    setInvalidInput("usuario");
  }
  if (!validateEmail(email)) {
    setInvalidInput("email");
  }
  if (!validatePassword(password)) {
    setInvalidInput("contraseña");
  }
  if (!validateRepeatPassword(password, repeatpassword)) {
    setInvalidInput("Repetir contraseña");
  }

  // Cells that did not meet the requirements will be displayed
  let validationBox = document.getElementById("val-box");
  let validationListElem = document.getElementById("val-list");

  if (!isValid) {
    validationListElem.textContent = "";
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }

    // The div that will contain the invalid fields becomes visible
    validationBox.hidden = false;
  } else {

    // Code to display the next two boxes (confirmation and approval). The SweetAlert2 library is used for dialog boxes.
    var formularioValido = true;

    if (formularioValido) {
      // The first dialog box is displayed to see the confirmation of the form by the client.
      Swal.fire({
        title: '¿Confirma los datos ingresados?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmo',
        cancelButtonText: 'No, quiero volver al formulario',
        confirmButtonColor: '#f7505a',
        cancelButtonColor: '#f7505a',
      }).then((result) => {
        if (result.isConfirmed) {
          // code to execute if information is confirmed ("Sí, confirmo").
          Swal.fire({
            title: 'Éxito',
            text: 'Se ha creado su usuario correctamente.',
            icon: 'success'
          }).then(() => {
            // The form is submitted
            myForm.submit();
          });
        } else {
          //If you choose "No, quiero volver al formulario", it stays on the same page.
        }
      });
    }
  }
};
