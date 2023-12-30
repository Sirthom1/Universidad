//El mapa debe comenzar con una vista en `[-33.457, -70.6]` y con un zoom de `13`.
let map = L.map('map').setView([-33.457, -70.6], 9);

//Los colores para que se vea
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
}).addTo(map);

//http://127.0.0.1:5000/get-map-data
fetch("http://localhost:5000/get-map-data")
    .then((response) => response.json())
    .then((parsedData) => {

        // Arreglo para almacenar los marcadores de donaciones
        let donaciones = parsedData[0];

        // Arreglo para almacenar los marcadores de pedidos
        let pedidos = parsedData[1];

        console.log("Marcadores de donaciones:", donaciones);
        console.log("Marcadores de pedidos:", pedidos);

        // Crear un grupo de marcadores utilizando Leaflet.markercluster
        let markerClusterGroup = L.markerClusterGroup();

        // Marcadores para las donaciones
        for (let conf of donaciones) {
            let comuna = conf["comunas"]; // Obtener el nombre de la comuna desde los datos obtenidos

            // Realizar otro fetch para obtener las coordenadas correspondientes a la comuna
            fetch('static/js/comunas-Chile.json') // Reemplaza la ruta con la ubicación real del archivo JSON
                .then((response) => response.json())
                .then((comunasData) => {
                    let comunaData = comunasData.find((c) => c.name === comuna); // Buscar la comuna en los datos obtenidos del JSON

                    if (comunaData) {
                        let lat = comunaData.lat; // Obtener la latitud de la comuna
                        let lng = comunaData.lng; // Obtener la longitud de la comuna

                        const onMarkerClick = (e) => {
                            // Fecha sin hora
                            let fecha = new Date(conf["fecha"]).toDateString();
                            L.popup()
                                .setLatLng([lat, lng])
                                .setContent(
                                    `<h4>Donación:</h4><i>Id:${conf["don_id"]}</i><br>-Calle: ${conf["calle"]}<br>-Tipo: ${conf["tipo"]}
                                    <br>-Cantidad: ${conf["cantidad"]}<br>-Fecha: ${fecha}<br>-Correo: ${conf["email"]}`
                                )
                                .openOn(map);
                        };

                        let marker = L.marker([lat, lng]);

                        // marker.addTo(map);
                        marker.on("click", onMarkerClick);
                        markerClusterGroup.addLayer(marker);
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener los datos de las comunas:", error);
                });
        }
        console.log("aa");
        var greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        for (let conf of pedidos) {
            console.log("bb");
            let comuna = conf["comuna"]; // Obtener el nombre de la comuna desde los datos obtenidos
            console.log("cc", comuna);
            // Realizar otro fetch para obtener las coordenadas correspondientes a la comuna
            fetch('static/js/comunas-Chile.json') // Reemplaza la ruta con la ubicación real del archivo JSON
                .then((response) => response.json())
                .then((comunasData) => {
                    let comunaData = comunasData.find((c) => c.name === comuna); // Buscar la comuna en los datos obtenidos del JSON

                    if (comunaData) {
                        // Obtener la latitud de la comuna
                        let lat = comunaData.lat;
                        // Obtener la longitud de la comuna
                        let lng = comunaData.lng;
                        const onMarkerClick = (e) => {
                            L.popup()
                                .setLatLng([lat, lng])
                                .setContent(
                                    `<h4>Pedido:</h4><i>Id:${conf["id"]}</i><br>-Tipo: ${conf["tipo"]}
                                    <br>-Cantidad: ${conf["cantidad"]}<br>-Correo: ${conf["email"]}`
                                )
                                .openOn(map);
                        };
                        let marker = L.marker([lat, lng], { icon: greenIcon });

                        //marker.addTo(map);
                        marker.on("click", onMarkerClick);
                        markerClusterGroup.addLayer(marker);
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener los datos de las comunas:", error);
                });
        }
        // Añadir el grupo de marcadores al mapa
        map.addLayer(markerClusterGroup);

    })
    .catch((error) => {
        console.error("Error al obtener los datos para el mapa:", error);
    });