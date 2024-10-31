// Suponiendo que tienes un archivo perfil-usu.js o similar
document.addEventListener('DOMContentLoaded', () => {
    // Hacer la solicitud a la API para obtener la información del usuario
    fetch('/api/usuario')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el perfil de usuario');
            }
            return response.json();
        })
        .then(data => {
            // Actualiza el contenido de tu perfil con los datos recibidos
            document.querySelector('.user-avatar').innerText = data.nombre; // Muestra el nombre del usuario
            document.querySelector('.header span').innerText = '0 pts'; // Aquí puedes actualizar puntos si tienes una lógica
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
