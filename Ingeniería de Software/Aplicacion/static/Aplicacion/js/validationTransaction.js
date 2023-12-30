// First, create all the validation functions
const validatetype = (type1,type2) => {
  // To verify that it is necessary
  if (!type1.checked && !type2.checked) return false;
  return true;
};

const validateName = (name) => {
    // To verify that it is necessary
    if (!name) return false;
    return true
  };
const validateAmount = (amount) => { 
  // To verify that it is necessary
  if (!amount) return false;

  if(amount<0) return false;

  // To ensure it is in the correct format
  let re = /^-?\d+$/;
  let formatValid = re.test(amount);

  // To check if the requirement is met
  return formatValid;
};

const validateDate = (date) => { //
  // To verify that it is necessary
  if (!date) return false;

  // To ensure it is in the correct format
  let correct = true;
  let re = /^\d{4}-\d{2}-\d{2}$/;
  let formatValid = re.test(date);
  let isGood = correct && formatValid;
  return isGood;
};

const validateCategory = (category) => {
    // To verify that it is necessary
    if (category == "select") return false;
    return true;
};
  
// Then, check if the form meets all the requirements
const validateForm = () => {                
  let myForm = document.forms["TransactionForm"];
  let name = myForm["name_input"].value;
  let amount = myForm["amount_input"].value;
  let date = myForm["date_input"].value;
  let category = myForm["category_input"].value;
  let type1 = myForm["id_type_0"];
  let type2 = myForm["id_type_1"]; 

  // Auxiliary variables that will be used to see which variable/s meet or do not meet the requirements
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  // If the requested requirements are met or not
  if (!validatetype(type1,type2)) {
    setInvalidInput("Tipo de movimiento");
  }
  if (!validateName(name)) {
    setInvalidInput("Nombre");
  }
  if (!validateAmount(amount)) {
    setInvalidInput("Monto");
  }
  if (!validateDate(date)) {
    setInvalidInput("Fecha");
  }
  if (!validateCategory(category)) {
    setInvalidInput("Categoría");
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
    // set amount to negative if it is a expense
    if (type2.checked) {
      myForm["amount_input"].value *= -1;
    }

    // Code to display the next two boxes (confirmation and approval). The SweetAlert2 library is used for dialog boxes.
    var formularioValido = true;

    if (formularioValido) {
      myForm.submit();
      // The first dialog box is displayed to see the confirmation of the form by the client.
      
    }
  }
};