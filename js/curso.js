const cursosTab = document.getElementById('cursos-tab');
const acercaTab = document.getElementById('acerca-tab');
const cursosContent = document.getElementById('cursos-content');
const acercaContent = document.getElementById('acerca-content');

cursosTab.addEventListener('click', () => {
    cursosTab.classList.add('active');
    acercaTab.classList.remove('active');
    cursosContent.style.display = 'block';
    acercaContent.style.display = 'none';
});

acercaTab.addEventListener('click', () => {
    acercaTab.classList.add('active');
    cursosTab.classList.remove('active');
    acercaContent.style.display = 'block';
    cursosContent.style.display = 'none';
});