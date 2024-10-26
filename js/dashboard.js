// Redirigir al hacer clic en el botón Dashboard
document.getElementById('dashboard-button').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace realice su comportamiento predeterminado
    window.location.href = 'index_admin.html'; // Cambia 'index_admin.html' por la URL real de tu página de Dashboard
});

// Evento para manejar la activación de las pestañas
document.querySelectorAll('li a').forEach(tab => {
    tab.addEventListener('click', function() {
        // Elimina la clase 'active' de todas las pestañas
        document.querySelectorAll('li').forEach(item => item.classList.remove('active'));
        
        // Agrega la clase 'active' solo a la pestaña seleccionada
        this.parentElement.classList.add('active');
    });
});
// Redirigir al hacer clic en el botón Dashboard
document.getElementById('dashboard-button').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace realice su comportamiento predeterminado
    window.location.href = 'index_admin.html'; // Cambia 'index_admin.html' por la URL real de tu página de Dashboard
});

// Evento para manejar la activación de las pestañas
document.querySelectorAll('li a').forEach(tab => {
    tab.addEventListener('click', function() {
        // Elimina la clase 'active' de todas las pestañas
        document.querySelectorAll('li').forEach(item => item.classList.remove('active'));
        
        // Agrega la clase 'active' solo a la pestaña seleccionada
        this.parentElement.classList.add('active');
    });
});
