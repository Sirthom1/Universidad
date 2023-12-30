let regiones;

// Se usa la infromacion proporcionada en el Json para asignarle los valores a regiones
fetch('region_comuna.json')
  .then(response => response.json())
  .then(data => {
    regiones = data.regiones;

    // Obtener los elementos HTML de los menús seleccionables
    var regionSelect = document.getElementById("region");
    var comunaSelect = document.getElementById("comuna");

    // Agregar un evento "change" al menú de regiones
    regionSelect.addEventListener("change", function() {
      // Obtener la región seleccionada
      var regionId = this.value;
      var region = regiones.find(function(r) {
        return r.id == regionId;
      });

      // Limpiar el menú de comunas
      comunaSelect.innerText = "";

      // Agregar las comunas de la región seleccionada al menú de comunas
      region.comunas.forEach(function(c) {
        var option = document.createElement("option");
        option.value = c.id;
        option.textContent = c.nombre;
        comunaSelect.appendChild(option);
      });

      // Seleccionar la primera opción del menú de comunas
      comunaSelect.selectedIndex = 0;
    });

    // Seleccionar la primera opción del menú de regiones al cargar la página
    regionSelect.selectedIndex = 0;

    // Disparar el evento "change" del menú de regiones para actualizar el menú de comunas
    var event = new Event("change");
    regionSelect.dispatchEvent(event);
  })
  .catch(error => console.error(error));



