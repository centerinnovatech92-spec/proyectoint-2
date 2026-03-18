// login.js - VERSIÓN CORREGIDA
const API_URL = 'http://localhost:3000/api';

// Función para iniciar sesión
window.iniciarSesion = async function() {
    console.log("Función iniciarSesion ejecutándose");
    
    const email = document.getElementById('usuarioLogin')?.value;
    const password = document.getElementById('contraseñaLogin')?.value;

    if (!email || !password) {
        alert('Por favor completa todos los campos');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (data.success) {
            // Guardar en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('cliente', JSON.stringify(data.cliente));
            
            console.log('Token guardado:', data.token);
            console.log('Cliente guardado:', data.cliente);
            
            alert('✅ Login exitoso');
            
            // Redirigir a ticket.html
            window.location.href = 'ticket.html';
        } else {
            alert('❌ ' + (data.message || 'Error al iniciar sesión'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Error de conexión. ¿El backend está corriendo?');
    }
};

// Función para registrar usuario
window.registrar = async function() {
    console.log("Función registrar ejecutándose");
    
    const nombre = document.getElementById('nombre')?.value;
    const apellidos = document.getElementById('apellidos')?.value;
    const edad = document.getElementById('edad')?.value;
    const telefono = document.getElementById('telefono')?.value;
    const correo = document.getElementById('correo')?.value;
    const direccion = document.getElementById('direccion')?.value;
    const password = document.getElementById('contraseña')?.value;

    if (!nombre || !apellidos || !correo || !password) {
        alert('Por favor completa nombre, apellidos, correo y contraseña');
        return;
    }

    const clienteData = {
        Nombre: nombre,
        Apellidos: apellidos,
        Edad: edad ? parseInt(edad) : null,
        Sexo: 'No especificado',
        Ocupacion: 'Cliente',
        Telefono: telefono || '',
        Email: correo,
        Direccion: direccion || '',
        Password_cliente: password
    };

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        });

        const data = await response.json();

        if (data.success) {
            alert('✅ Registro exitoso. Ahora inicia sesión.');
            window.mostrarLogin();
        } else {
            alert('❌ Error: ' + (data.message || 'No se pudo registrar'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Error de conexión');
    }
};

// Función para mostrar registro
window.mostrarRegistro = function() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('registro').style.display = 'block';
};

// Función para mostrar login
window.mostrarLogin = function() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('registro').style.display = 'none';
};

// Verificar si ya hay sesión al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log("Verificando sesión existente...");
    const token = localStorage.getItem('token');
    const cliente = localStorage.getItem('cliente');
    
    console.log("Token encontrado:", token ? "SÍ" : "NO");
    console.log("Cliente encontrado:", cliente ? "SÍ" : "NO");
    
    // Si hay token, redirigir a ticket.html
    if (token && cliente) {
        console.log("Sesión válida encontrada, redirigiendo...");
        window.location.href = 'ticket.html';
    } else {
        console.log("No hay sesión, mostrar login");
    }
});