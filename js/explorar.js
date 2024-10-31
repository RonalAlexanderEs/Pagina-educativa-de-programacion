const courses = [
    // Cursos de Programación Web (5-10, 11-18, 19-+)
    { title: "Introducción a la Programación con Scratch", instructor: "Varios", category: "programacion", url: "tema.html", ageRange: "5 - 10" },
    { title: "Programación Web con JavaScript Básico", instructor: "Varios", category: "programacion", url: "tema.html", ageRange: "11 - 18" },
    { title: "Desarrollo Full Stack con JavaScript", instructor: "Varios", category: "programacion", url: "tema.html", ageRange: "19 - +" },

    // Cursos de Base de Datos (5-10, 11-18, 19-+)
    { title: "Introducción a las Bases de Datos", instructor: "Varios", category: "basededatos", url: "tema.html", ageRange: "5 - 10" },
    { title: "Modelado de Bases de Datos con SQL", instructor: "Varios", category: "basededatos", url: "tema.html", ageRange: "11 - 18" },
    { title: "Bases de Datos Avanzadas con MongoDB", instructor: "Varios", category: "basededatos", url: "tema.html", ageRange: "19 - +" },

    // Cursos de Desarrollo de Aplicaciones (5-10, 11-18, 19-+)
    { title: "Crea tu Primera App Móvil", instructor: "Varios", category: "desaapp", url: "tema.html", ageRange: "5 - 10" },
    { title: "Desarrollo de Aplicaciones Móviles con Flutter", instructor: "Varios", category: "desaapp", url: "tema.html", ageRange: "11 - 18" },
    { title: "Aplicaciones Móviles Avanzadas con Kotlin", instructor: "Varios", category: "desaapp", url: "tema.html", ageRange: "19 - +" },

    // Cursos de Inteligencia Artificial (5-10, 11-18, 19-+)
    { title: "IA Básica para Niños", instructor: "Varios", category: "iacurso", url: "tema.html", ageRange: "5 - 10" },
    { title: "Machine Learning para Jóvenes", instructor: "Varios", category: "iacurso", url: "tema.html", ageRange: "11 - 18" },
    { title: "IA y Machine Learning Avanzado", instructor: "Varios", category: "iacurso", url: "tema.html", ageRange: "19 - +" },

    // Cursos de Ciberseguridad (5-10, 11-18, 19-+)
    { title: "Ciberseguridad para Principiantes", instructor: "Varios", category: "ciberseguridad", url: "tema.html", ageRange: "5 - 10" },
    { title: "Ciberseguridad: Hacking Ético", instructor: "Varios", category: "ciberseguridad", url: "tema.html", ageRange: "11 - 18" },
    { title: "Ciberseguridad Avanzada", instructor: "Varios", category: "ciberseguridad", url: "tema.html", ageRange: "19 - +" },

    // Cursos de Desarrollo de Videojuegos (5-10, 11-18, 19-+)
    { title: "Crea Videojuegos con Scratch", instructor: "Varios", category: "desavideo", url: "tema.html", ageRange: "5 - 10" },
    { title: "Desarrollo de Videojuegos con Unity", instructor: "Varios", category: "desavideo", url: "tema.html", ageRange: "11 - 18" },
    { title: "Videojuegos con Unreal Engine", instructor: "Varios", category: "desavideo", url: "tema.html", ageRange: "19 - +" },

    // Robótica y Automatización (5-10, 11-18, 19-+)
    { title: "Robótica para Niños", instructor: "Varios", category: "robotica", url: "tema.html", ageRange: "5 - 10" },
    { title: "Robótica con Arduino", instructor: "Varios", category: "robotica", url: "tema.html", ageRange: "11 - 18" },
    { title: "Automatización Avanzada", instructor: "Varios", category: "robotica", url: "tema.html", ageRange: "19 - +" },

    // Big Data (5-10, 11-18, 19-+)
    { title: "Introducción al Big Data", instructor: "Varios", category: "bigdata", url: "tema.html", ageRange: "5 - 10" },
    { title: "Análisis de Datos con SQL", instructor: "Varios", category: "bigdata", url: "tema.html", ageRange: "11 - 18" },
    { title: "Big Data y Ciencia de Datos Avanzada", instructor: "Varios", category: "bigdata", url: "tema.html", ageRange: "19 - +" },

    // Realidad Aumentada y Virtual (5-10, 11-18, 19-+)
    { title: "Realidad Aumentada para Principiantes", instructor: "Varios", category: "realidadvr", url: "tema.html", ageRange: "5 - 10" },
    { title: "Realidad Virtual con Unity", instructor: "Varios", category: "realidadvr", url: "tema.html", ageRange: "11 - 18" },
    { title: "Proyectos Avanzados de VR", instructor: "Varios", category: "realidadvr", url: "tema.html", ageRange: "19 - +" },
];


const categoryFilter = document.getElementById('category-filter');
const ageFilter = document.getElementById('age-filter');

function createCourseCard(course) {
    const card = document.createElement('a');
    card.href = course.url;
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-title">${course.title}</div>
        <div class="course-instructor">Por ${course.instructor}</div>
        <div class="course-age">Edad : ${course.ageRange}</div>
    `;
    return card;
}

function displayCourses() {
    const selectedAge = ageFilter.value;

    const containers = {
        all: document.getElementById('courses-container'), 
        programacion: document.getElementById('programacion-container'),
        basededatos: document.getElementById('basededatos-container'),
        desaapp: document.getElementById('desaapp-container'),
        iacurso: document.getElementById('ia-container'),
        ciberseguridad: document.getElementById('ciberseguridad-container'),
        desavideo: document.getElementById('desavideo-container'),
        robotica: document.getElementById('robotica-container'),
        bigdata: document.getElementById('bigdata-container'),
        desaappmovil: document.getElementById('desaappmovil-container'),
        realidadvr: document.getElementById('realidadvr-container'),
    };

    // Limpiar todos los contenedores
    Object.values(containers).forEach(container => {
        if (container) container.innerHTML = '';
    });

    // Filtrar cursos solo por edad
    const filteredCourses = courses.filter(course => {
        return selectedAge === 'all' || course.ageRange === selectedAge;
    });


    // Mostrar los cursos en la sección "Todos los cursos"
    filteredCourses.forEach(course => {
        if (containers.all) {
            const card = createCourseCard(course);
            containers.all.appendChild(card.cloneNode(true));
        }
    });

    // Mostrar los cursos filtrados en sus respectivas categorías
    filteredCourses.forEach(course => {
        if (containers[course.category]) {
            const card = createCourseCard(course);
            containers[course.category].appendChild(card);
        }
    });

    // Mostrar/ocultar secciones según si tienen contenido
    Object.entries(containers).forEach(([category, container]) => {
        if (container) {
            const section = container.closest('.category-section');
            if (section) {
                section.style.display = container.children.length === 0 ? 'none' : 'block';
            }
        }
    });
}

// Manejar el cambio de categoría (solo para scroll)
categoryFilter.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    
    if (selectedCategory === 'all') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        const selectedSection = document.getElementById(selectedCategory);
        if (selectedSection) {
            selectedSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Manejar el cambio de edad (para filtrado)
ageFilter.addEventListener('change', displayCourses);

// Mostrar cursos iniciales
displayCourses();