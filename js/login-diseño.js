// Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

// Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

// FUNCIONES
function anchoPage() {
    if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";   
    }
}

anchoPage();

function iniciarSesion() {
    if (window.innerWidth > 850) {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

function register() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

// Agregar manejador para el formulario de registro
const registerForm = document.querySelector('#registerForm'); // Asegúrate de tener un formulario con este id

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita el envío del formulario

    const nombre = document.querySelector('#nombre').value;
    const apellidos = document.querySelector('#apellidos').value;
    const email = document.querySelector('#emailRegister').value;
    const password = document.querySelector('#passwordRegister').value;
    const fechaNacimiento = document.querySelector('#fecha_nacimiento').value;

    // Log para depuración
    console.log('Nombre:', nombre);
    console.log('Apellidos:', apellidos);
    console.log('Correo:', email);
    console.log('Contraseña:', password);
    console.log('Fecha de Nacimiento:', fechaNacimiento); // Agrega este log

    // Verifica que los campos no estén vacíos
    if (!nombre || !apellidos || !email || !password || !fechaNacimiento) {
        return alert('Por favor, completa todos los campos.');
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellidos, correo: email, password, fechaNacimiento })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert('Usuario registrado exitosamente.');
        formulario_register.reset(); // Limpiar el formulario de registro
        register(); // Regresar al formulario de inicio de sesión o hacer algo más
    } catch (error) {
        alert(error.message || 'Error al registrar el usuario');
    }
});


/*Login-Diseño*/
const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita el envío del formulario

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Verifica que los campos no estén vacíos
    if (!email || !password) {
        return alert('Por favor, completa todos los campos.');
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(data); // Muestra el error en la consola
            throw new Error(data.message || 'Error en el inicio de sesión');
        }

        // Aquí asumiendo que `data.user` tiene la información del usuario
        alert(`Bienvenido ${data.user.nombre}`); // Usa data.user.nombre
        localStorage.setItem('login_success', JSON.stringify(data));
        window.location.href = data.redirect; // Redirige a la página indicada
    } catch (error) {
        console.error('Error al iniciar sesión:', error); // Muestra el error en la consola
        alert(error.message || 'Error al iniciar sesión');
    }
});
