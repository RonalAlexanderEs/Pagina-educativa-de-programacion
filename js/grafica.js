// Mostrar secciones según pestaña seleccionada
document.querySelector('.dashboard').addEventListener('click', function() {
  showTab('dashboard-content');
  actualizarEstadisticas();
});

function showTab(tabId) {
  document.querySelectorAll('.content-tab').forEach(function(tab) {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

// Actualizar estadísticas generales (valores simulados)
function actualizarEstadisticas() {
  document.getElementById('num-estudiantes').textContent = 150; // Número de estudiantes
  document.getElementById('num-docentes').textContent = 30; // Número de docentes
  document.getElementById('usuarios-activos').textContent = 120; // Usuarios activos

  // Datos del gráfico de suscripciones
  const ctx = document.getElementById('subscriptionChart').getContext('2d');
  const subscriptionChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Familiar', 'Personal', 'Becado', 'Dúo'],
      datasets: [{
        label: 'Suscripciones',
        data: [50, 70, 20, 10], // Valores simulados
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Distribución de Planes de Suscripción'
        }
      }
    }
  });
}

// Llamar a la función de estadísticas al cargar el dashboard
document.addEventListener('DOMContentLoaded', function() {
  actualizarEstadisticas();
});
