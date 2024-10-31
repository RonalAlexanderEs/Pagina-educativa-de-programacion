const schools = [
    { icon: '🧠', name: 'Programación Web', class: 'ProgramaciónWeb' },
    { icon: '🛡️', name: 'Bases de Datos', class: 'BasesDatos' },
    { icon: '👥', name: 'Desarrollo de Aplicaciones', class: 'DesaApp' },
    { icon: '🌐', name: 'Inteligencia Artificial y Machine Learning', class: 'InteligenciaLearning' },
    { icon: '💻', name: 'Ciberseguridad', class: 'Ciberseguridad' },
    { icon: '📢', name: 'Desarrollo de Videojuegos', class: 'DesaVide' },
    { icon: '✏️', name: 'Robótica y Automatización', class: 'Robótica' },
    { icon: '🎬', name: 'Big Data y Análisis de Datos', class: 'BigData' },
    { icon: '📊', name: 'Desarrollo de Aplicaciones Móviles', class: 'DesarrolloMóviles' },
    { icon: '🤖', name: 'Realidad Aumentada y Realidad Virtual', class: 'RealidadA' },
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