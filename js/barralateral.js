document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remover clase activa de todos los items del menú
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        // Añadir clase activa al item clickeado
        this.classList.add('active');
        
        // Ocultar todos los contenidos
        document.querySelectorAll('.content-item').forEach(content => content.classList.remove('active'));
        // Mostrar el contenido correspondiente
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Activar el primer item por defecto
document.querySelector('.menu-item').click();