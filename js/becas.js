const form = document.querySelector("#beca-form"),
    nextBtn = document.querySelector(".nextBtn"),
    backBtn = document.querySelector(".backBtn"),
    submitBtn = document.querySelector(".submit-btn"),
    firstForm = document.querySelector(".form.first"),
    secondForm = document.querySelector(".form.second"),
    allInput = document.querySelectorAll(".first input, .first select");

// Manejador para el botón "Siguiente"
nextBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    let allFilled = true;

    allInput.forEach(input => {
        if (input.value === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        firstForm.style.display = 'none'; // Oculta el primer formulario
        secondForm.style.display = 'block'; // Muestra el segundo formulario
        backBtn.style.display = 'block'; // Muestra el botón "Anterior"
        submitBtn.disabled = !checkAllForms(); // Habilitar/Deshabilitar botón "Aceptar"
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

// Manejador para el botón "Anterior"
backBtn.addEventListener("click", () => {
    firstForm.style.display = 'block'; // Muestra el primer formulario
    secondForm.style.display = 'none'; // Oculta el segundo formulario
    backBtn.style.display = 'none'; // Oculta el botón "Anterior"
});

// Función para verificar si el primer formulario está completo
function checkFirstForm() {
    const inputs = firstForm.querySelectorAll('input, select');
    return Array.from(inputs).every(input => input.value.trim() !== '');
}

// Función para verificar si todos los formularios están completos y habilitar el botón "Aceptar"
function checkAllForms() {
    const inputs = secondForm.querySelectorAll('input, select');
    return checkFirstForm() && Array.from(inputs).every(input => input.value.trim() !== '');
}

// Verifica cambios en el segundo formulario
secondForm.addEventListener('change', function () {
    submitBtn.disabled = !checkAllForms(); // Habilitar/Deshabilitar botón "Aceptar"
});

// También verifica el primer formulario cuando cambian sus campos
firstForm.addEventListener('input', function () {
    submitBtn.disabled = !checkAllForms(); // Habilitar/Deshabilitar botón "Aceptar"
});

// Manejador para el envío del formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    const formData = new FormData(form); // Captura todos los datos del formulario

    try {
        const response = await fetch('/api/beca', { // Cambia la ruta según corresponda
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            alert("Solicitud enviada exitosamente.");
            form.reset(); // Limpia el formulario después de enviar
            firstForm.style.display = 'block'; // Regresa al primer formulario
            secondForm.style.display = 'none'; // Oculta el segundo formulario
            backBtn.style.display = 'none'; // Oculta el botón "Anterior"
            submitBtn.disabled = true; // Deshabilita el botón de enviar
        } else {
            alert("Error al enviar la solicitud. Inténtalo de nuevo.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Error de conexión. Inténtalo más tarde.");
    }
});
