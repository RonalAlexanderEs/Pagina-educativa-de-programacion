document.getElementById('estadisticas-tab').addEventListener('click', function() {
    // Ocultar todas las secciones de contenido
    const tabs = document.querySelectorAll('.content-tab');
    tabs.forEach(tab => tab.style.display = 'none');

    // Mostrar la sección de estadísticas
    document.getElementById('estadisticas-content').style.display = 'block';

    // Aquí podrías agregar lógica para cargar los datos de las estadísticas
    cargarEstadisticas();
});
function cargarEstadisticas() {
    // Lógica para obtener los datos de los usuarios (puedes usar una API)
    fetch('/ruta/a/tu/api/usuarios') // Cambia esto a tu API
        .then(response => response.json())
        .then(data => {
            // Actualiza los elementos de estadísticas
            document.getElementById('total-usuarios').innerText = data.total;
            document.getElementById('usuarios-activos').innerText = data.activos;
            document.getElementById('usuarios-inactivos').innerText = data.inactivos;

            // Aquí puedes crear un gráfico de usuarios
            const ctx = document.getElementById('usuariosChart').getContext('2d');
            const usuariosChart = new Chart(ctx, {
                type: 'bar', // Cambia el tipo de gráfico según sea necesario
                data: {
                    labels: ['Activos', 'Inactivos'],
                    datasets: [{
                        label: 'Usuarios',
                        data: [data.activos, data.inactivos],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar estadísticas:', error);
        });
}
function cargarEstadisticas() {
    // Lógica para obtener los datos de los usuarios (puedes usar una API)
    fetch('/ruta/a/tu/api/usuarios') // Cambia esto a tu API
        .then(response => response.json())
        .then(data => {
            // Actualiza los elementos de estadísticas
            document.getElementById('total-usuarios').innerText = data.total;
            document.getElementById('usuarios-activos').innerText = data.activos;
            document.getElementById('usuarios-inactivos').innerText = data.inactivos;

            // Crear gráfico circular
            const ctx = document.getElementById('usuariosChart').getContext('2d');
            const usuariosChart = new Chart(ctx, {
                type: 'pie', // Cambia el tipo de gráfico a 'pie' para gráfico circular
                data: {
                    labels: ['Activos', 'Inactivos'],
                    datasets: [{
                        label: 'Usuarios',
                        data: [data.activos, data.inactivos],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return tooltipItem.label + ': ' + tooltipItem.raw; // Personaliza el tooltip
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar estadísticas:', error);
        });
}
