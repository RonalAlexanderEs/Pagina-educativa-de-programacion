const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capturando valores de los inputs
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#emailRegister').value; 
    const usuario = document.querySelector('#usuario').value; 
    const password = document.querySelector('#passwordRegister').value; 
    const fechaNacimiento = document.querySelector('#fecha_nacimiento').value; 

    // Verificando si los datos se capturan correctamente
    console.log('Datos capturados:', { name, email, usuario, password, fechaNacimiento });

    // Enviar datos al backend para el registro
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: name, apellidos: '', correo: email, usuario, password, fecha_nacimiento: fechaNacimiento })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Registro Exitoso!');
            window.location.href = 'sesion.html'; // Redirigir a la página de inicio de sesión
        } else {
            alert(data.error || 'Error en el registro');
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Error al registrar el usuario');
    }
});

/* VALIDACIÓN DE CAMBIO ENTRE FORMULARIOS */
const btnSignIn = document.getElementById("btn__iniciar-sesion");
const btnSignUp = document.getElementById("btn__registrarse");
const containerFormRegister = document.querySelector(".formulario__register");
const containerFormLogin = document.querySelector(".formulario__login");

btnSignIn.addEventListener("click", () => {
    containerFormRegister.style.display = "none"; // Ocultar registro
    containerFormLogin.style.display = "block"; // Mostrar inicio de sesión
});

btnSignUp.addEventListener("click", () => {
    containerFormLogin.style.display = "none"; // Ocultar inicio de sesión
    containerFormRegister.style.display = "block"; // Mostrar registro
});
