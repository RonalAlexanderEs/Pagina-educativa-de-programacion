// Función para cargar los datos de ingresos
function cargarIngresos() {
    fetch('/ruta/a/tu/api/ingresos') // Cambia esto a la ruta de tu API
        .then(response => response.json())
        .then(data => {
            // Actualiza los elementos de ingresos
            document.getElementById('total-ingresos').innerText = `$${data.total.toFixed(2)}`;
            document.getElementById('ingresos-mensuales').innerText = `$${data.mensuales.toFixed(2)}`;

            // Crear gráfico de ingresos
            const ctx = document.getElementById('ingresosChart').getContext('2d');
            const ingresosChart = new Chart(ctx, {
                type: 'line', // Gráfico de líneas para mostrar tendencias
                data: {
                    labels: data.meses, // Nombres de los meses
                    datasets: [{
                        label: 'Ingresos',
                        data: data.ingresosMensuales, // Datos de ingresos mensuales
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `Ingresos: $${tooltipItem.raw.toFixed(2)}`; // Personaliza el tooltip
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar ingresos:', error);
        });
}

// Evento para mostrar la sección de ingresos al hacer clic
document.getElementById('ingresos-tab').addEventListener('click', function() {
    // Ocultar todas las secciones de contenido
    const tabs = document.querySelectorAll('.content-tab');
    tabs.forEach(tab => tab.style.display = 'none');

    // Mostrar la sección de ingresos
    document.getElementById('ingresos-content').style.display = 'block';

    // Cargar los ingresos
    cargarIngresos();
});
