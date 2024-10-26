const cursos = [
    { id: 1, nombre: "Curso de Inteligencia Artificial", url: "tema.html" },
    { id: 2, nombre: "Introducción a Ciberseguridad", url: "curso-ciberseguridad.html" },
    { id: 3, nombre: "Curso de Inglés Básico A1", url: "curso-ingles.html" },
    { id: 4, nombre: "Ciberseguridad Avanzada", url: "ciberseguridad-avanzada.html" },
    { id: 5, nombre: "Liderazgo y Management", url: "liderazgo.html" },
    { id: 6, nombre: "English Academy", url: "english-academy.html" },



    { id: 7, nombre: "Ruta Data Science e Inteligencia Artificial", url: "data-science.html" },
    { id: 8, nombre: "Ruta Ciberseguridad", url: "cybersecurity.html" },
    { id: 9, nombre: "Ruta Ingles", url: "english.html" },
    { id: 10, nombre: "Ruta Desarrollo Web", url: "web-dev.html" },
    { id: 11, nombre: "Liderazgo y Management", url: "liderazgo.html" },
    { id: 12, nombre: "English Academy", url: "english-academy.html" },
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