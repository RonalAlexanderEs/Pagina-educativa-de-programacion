function changeMultipleColors(variables, newColors) {
    // Cambia varias variables de color al mismo tiempo
    variables.forEach((variable, index) => {
        document.documentElement.style.setProperty(variable, newColors[index]);
    });
}


/*ANIMACIÓN DE NUMEROS */

function animateValue(element, start, end, duration) {
    const prefix = element.dataset.prefix || '';
    let startTimestamp = null;
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;
        
        const percentage = Math.min(progress / duration, 1);
        const currentValue = Math.floor(start + (end - start) * percentage);
        
        element.textContent = `${prefix}${currentValue}`;
        
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}

// Iniciar animaciones cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    const metrics = document.querySelectorAll('.metric-value');
    
    metrics.forEach(metric => {
        const endValue = parseInt(metric.dataset.end, 10);
        animateValue(metric, 0, endValue, 2000);
    });
});