// Función para cargar los datos de los pagos
function cargarPagos() {
    // Simulando la respuesta de la API con datos de ejemplo
    const data = {
        pagos: [
            {
                nombreAlumno: "Juan Pérez",
                tipoPago: "Suscripción Mensual",
                monto: 29.99,
                fechaPago: "2024-10-01",
                estado: "Pagado"
            },
            {
                nombreAlumno: "María López",
                tipoPago: "Pago Único",
                monto: 199.99,
                fechaPago: "2024-10-10",
                estado: "Pendiente"
            }
        ]
    };

    const pagosTableBody = document.getElementById('pagos-table').querySelector('tbody');
    pagosTableBody.innerHTML = ''; // Limpia la tabla antes de llenarla

    // Llenar la tabla con los datos de pagos
    data.pagos.forEach(pago => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pago.nombreAlumno}</td>
            <td>${pago.tipoPago}</td>
            <td>$${pago.monto.toFixed(2)}</td>
            <td>${new Date(pago.fechaPago).toLocaleDateString()}</td>
            <td>${pago.estado}</td>
        `;
        pagosTableBody.appendChild(row);
    });
}

// Evento para mostrar la sección de gestión de pagos al hacer clic
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('gestion-pagos-tab').addEventListener('click', function() {
        // Ocultar todas las secciones de contenido
        const tabs = document.querySelectorAll('.content-tab');
        tabs.forEach(tab => tab.style.display = 'none');

        // Mostrar la sección de gestión de pagos
        document.getElementById('gestion-pagos-content').style.display = 'block';

        // Cargar los pagos
        cargarPagos();
    });
});



// Evento para mostrar la sección de gestión de pagos al hacer clic
document.getElementById('gestión-pagos-tab').addEventListener('click', function() {
    // Ocultar todas las secciones de contenido
    const tabs = document.querySelectorAll('.content-tab');
    tabs.forEach(tab => tab.style.display = 'none');

    // Mostrar la sección de gestión de pagos
    document.getElementById('gestion-pagos-content').style.display = 'block';

    // Cargar los pagos
    cargarPagos();
});



