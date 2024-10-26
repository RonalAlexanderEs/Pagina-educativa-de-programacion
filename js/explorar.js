const courses = [
    { title: "Full Stack Developer con JavaScript", instructor: "Varios instructores", category: "desarrollo", icon: "💻", url: "tema.html" },
    { title: "Curso de Configuración de Entorno de Desarrollo en Windows", instructor: "-----", category: "desarrollo", icon: "🖥️", url: "https://ejemplo.com/curso-windows" },
    { title: "Curso de Configuración de Entorno de Desarrollo en Linux", instructor: "-----", category: "desarrollo", icon: "🐧", url: "https://ejemplo.com/curso-linux" },
    { title: "Curso de Introducción a la Terminal y Línea de Comandos", instructor: "-----", category: "desarrollo", icon: "📟", url: "https://ejemplo.com/curso-terminal" },
    { title: "Curso Profesional de Git y GitHub", instructor: "-----", category: "desarrollo", icon: "🐙", url: "https://ejemplo.com/curso-git" },
    { title: "Curso de Frontend Developer", instructor: "-----", category: "desarrollo", icon: "🌐", url: "https://ejemplo.com/curso-frontend" },
    { title: "Curso de Inglés Técnico para Profesionales", instructor: "-----", category: "ingles", icon: "🗣️", url: "https://ejemplo.com/curso-ingles" },
    { title: "Marketing Digital para Startups", instructor: "-----", category: "marketing", icon: "📊", url: "https://ejemplo.com/curso-marketing" },
    { title: "Liderazgo en Equipos Tecnológicos", instructor: "-----", category: "liderazgo", icon: "👥", url: "https://ejemplo.com/curso-liderazgo" },
    { title: "Emprendimiento en Tecnología", instructor: "-----", category: "negocios", icon: "🚀", url: "https://ejemplo.com/curso-emprendimiento" },
];

const categoryFilter = document.getElementById('category-filter');

function createCourseCard(course) {
    const card = document.createElement('a');
    card.href = course.url;
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-icon">${course.icon}</div>
        <div class="course-title">${course.title}</div>
        <div class="course-instructor">Por ${course.instructor}</div>
    `;
    return card;
}

function displayCourses() {
    const containers = {
        all: document.getElementById('courses-container'),
        desarrollo: document.getElementById('desarrollo-container'),
        ingles: document.getElementById('ingles-container'),
        marketing: document.getElementById('marketing-container'),
        liderazgo: document.getElementById('liderazgo-container'),
        negocios: document.getElementById('negocios-container')
    };

    // Clear all containers
    Object.values(containers).forEach(container => container.innerHTML = '');

    // Populate containers
    courses.forEach(course => {
        containers.all.appendChild(createCourseCard(course));
        containers[course.category].appendChild(createCourseCard(course));
    });
}

categoryFilter.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'all') {
        window.scrollTo(0, 0);
    } else {
        const categorySection = document.getElementById(selectedCategory);
        categorySection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Initial display
displayCourses();