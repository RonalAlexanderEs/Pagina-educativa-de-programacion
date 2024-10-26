function changeMultipleColors(variables, newColors) {
    // Cambia varias variables de color al mismo tiempo
    variables.forEach((variable, index) => {
        document.documentElement.style.setProperty(variable, newColors[index]);
    });
}
