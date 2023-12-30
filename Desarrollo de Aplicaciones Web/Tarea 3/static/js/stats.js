Highcharts.chart("graficoD", {
    chart: {
        type: "bar",
    },
    title: {
        text: "Todas las donaciones según su tipo",
    },
    xAxis: {
        categories: ['Fruta', 'Verdura', 'Otro'],
        title: {
            text: "Tipo de donación",
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: "Cantidad de donaciones",
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
        align: "left",
        verticalAlign: "top",
        borderWidth: 0,
    },

    tooltip: {
        shared: true,
        crosshairs: true,
    },
    accessibility: {
        enabled: true
    },

    series: [
        {
            name: "Donaciones",
            data: [],
            lineWidth: 1,
            marker: {
                enabled: true,
                radius: 4,
            },
            color: "#544FC5",
        },
    ],
});

Highcharts.chart("graficoP", {
    chart: {
        type: "bar",
    },
    title: {
        text: "Todos los pedidos según su tipo",
    },
    xAxis: {
        categories: ['Fruta', 'Verdura', 'Otro'],
        title: {
            text: "Tipo de pedido",
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: "Cantidad de pedidos",
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
        align: "left",
        verticalAlign: "top",
        borderWidth: 0,
    },

    tooltip: {
        shared: true,
        crosshairs: true,
    },
    accessibility: {
        enabled: true
    },

    series: [
        {
            name: "Pedidos",
            data: [],
            lineWidth: 1,
            marker: {
                enabled: true,
                radius: 4,
            },
            color: "#00E272",
        },
    ],
});

fetch("http://localhost:5000/get-stats-data")
    .then((response) => response.json())
    .then((parsedData) => {
        // Arreglo para almacenar los marcadores de donaciones
        let donaciones = parsedData[0];

        // Arreglo para almacenar los marcadores de pedidos
        let pedidos = parsedData[1];

        console.log("Marcadores de donaciones:", donaciones);
        console.log("Marcadores de pedidos:", pedidos);

        // Get the chart by ID
        const chart = Highcharts.charts.find(
            (chart) => chart && chart.renderTo.id === "graficoD"
        );

        // Update the chart with new data
        chart.update({
            series: [
                {
                    data: donaciones,
                },
            ],
        });

        // Get the chart by ID
        const chart1 = Highcharts.charts.find(
            (chart) => chart && chart.renderTo.id === "graficoP"
        );

        // Update the chart with new data
        chart1.update({
            series: [
                {
                    data: pedidos,
                },
            ],
        });
    })
    .catch((error) => {
        console.error("Error al obtener los datos para el gráfico:", error);
    });