// Obtener los elementos HTML de los menús seleccionables
var regionSelect = document.getElementById("region");
var comunaSelect = document.getElementById("comuna");

// Agregar un evento "change" al menú de regiones
regionSelect.addEventListener("change", function() {
  // Obtener la región seleccionada
  var regionId = this.value;

  // Realizar la solicitud AJAX para obtener las comunas de la región seleccionada
  fetch(`/obtener_comunas/${regionId}`)
    .then(response => response.json())
    .then(data => {
      // Limpiar el menú de comunas
      comunaSelect.innerText = "";

      // Agregar las comunas de la región seleccionada al menú de comunas
      data.comunas.forEach(function(comuna) {
        var option = document.createElement("option");
        option.value = comuna[0];
        option.textContent = comuna[1];
        comunaSelect.appendChild(option);
      });
    })
    .catch(error => console.error(error));
});



