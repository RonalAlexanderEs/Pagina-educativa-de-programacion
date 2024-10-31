const cursos = [
    { id: 1, nombre: "Curso de Inteligencia Artificial", url: "tema.html" },
    { id: 2, nombre: "Ruta - Base de datos", url: "BasesDatos.html" },
    { id: 3, nombre: "Ruta - Big Data", url: "BigData.html" },
    { id: 4, nombre: "Ruta - Ciberseguridad", url: "Ciberseguridad.html" },
    { id: 5, nombre: "Ruta - Desarrollo de Aplicación", url: "DesaApp.html" },
    { id: 6, nombre: "Ruta - Desarrollo Móviles", url: "DesarrolloMóviles.html" },

    { id: 7, nombre: "Ruta - Desarrollo de Videojuegos", url: "DesaVideo.html" },
    { id: 8, nombre: "Ruta - Inteligencia Artificial (IA)", url: "InteligenciaLeaning.html" },
    { id: 9, nombre: "Ruta - Programación Web", url: "ProgramaciónWeb.html" },
    { id: 10, nombre: "Ruta - Realidad Virtual(RV) y Aumentada(RA)", url: "RealidadA.html" },
    { id: 11, nombre: "Ruta - Robótica", url: "Robótica.html" },
    { id: 12, nombre: "Beca", url: "beca.html" },
    { id: 13, nombre: "Planes", url: "planes.html" },
    { id: 14, nombre: "Cursos", url: "explorar.html" },

];

const searchInput = document.querySelector('.search-input');
const suggestionsList = document.querySelector('.suggestions');

searchInput.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const filteredCursos = cursos.filter(curso => 
        curso.nombre.toLowerCase().includes(inputValue)
    );

    suggestionsList.innerHTML = '';
    
    if (inputValue.length > 0 && filteredCursos.length > 0) {
        filteredCursos.forEach(curso => {
            const li = document.createElement('li');
            li.textContent = curso.nombre;
            li.addEventListener('click', () => {
                window.location.href = curso.url;
            });
            suggestionsList.appendChild(li);
        });
        suggestionsList.style.display = 'block';
    } else {
        suggestionsList.style.display = 'none';
    }
});

// Ocultar sugerencias cuando se hace clic fuera del input
document.addEventListener('click', function(e) {
    if (e.target !== searchInput) {
        suggestionsList.style.display = 'none';
    }
});