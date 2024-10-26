const schools = [
    { icon: '🧠', name: 'Data Science e Inteligencia Artificial', class: 'data-science' },
    { icon: '🛡️', name: 'Ciberseguridad', class: 'cybersecurity' },
    { icon: '👥', name: 'Liderazgo y Management', class: 'leadership' },
    { icon: '🌐', name: 'English Academy', class: 'english' },
    { icon: '💻', name: 'Desarrollo Web', class: 'web-dev' },
    { icon: '📢', name: 'Marketing Digital', class: 'marketing' },
    { icon: '✏️', name: 'Producto', class: 'product' },
    { icon: '🎬', name: 'Contenido Audiovisual', class: 'audiovisual' },
    { icon: '📊', name: 'Análisis de Datos', class: 'data-analysis' },
    { icon: '🤖', name: 'Robótica', class: 'robotics' },
    { icon: '📱', name: 'Desarrollo de Apps Móviles', class: 'mobile-dev' },
    { icon: '🎨', name: 'Diseño UX/UI', class: 'ux-ui' }
];

const despliegue = document.getElementById('despliegue'); // Cambiado para coincidir con el ID en HTML
const desplegarbtn = document.getElementById('desplegarbtn');
let expanded = false;

function createSchoolCard(escuela) {
    return `
        <div class="tarjeta-escuela">
            <div class="icon ${escuela.class}">${escuela.icon}</div>
            <div class="tarjeta-text">
                <p class="tarjeta-title">ESCUELA DE</p>
                  <h2 class="escuela"><a href="/${escuela.class}.html">${escuela.name}</a></h2>
            </div>
            <div class="arrow">›</div>
        </div>
    `;
}

function renderSchools(limit = 8) {
    despliegue.innerHTML = '';
    for (let i = 0; i < limit; i++) {
        if (schools[i]) {
            despliegue.innerHTML += createSchoolCard(schools[i]);
        }
    }
}

desplegarbtn.addEventListener('click', () => {
    if (expanded) {
        renderSchools(8);
        desplegarbtn.textContent = 'Ver todas las escuelas';
    } else {
        renderSchools(schools.length);
        desplegarbtn.textContent = 'Ver menos';
    }
    expanded = !expanded;
});

// Inicialmente, muestra solo 8 escuelas
renderSchools();