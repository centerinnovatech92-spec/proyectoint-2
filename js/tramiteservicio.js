// tramite-pro.js - VERSIÓN CORREGIDA
const API_URL = 'http://localhost:3000/api';

// ===========================================
// VERIFICAR AUTENTICACIÓN
// ===========================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log("🔍 Verificando autenticación...");
    
    const token = localStorage.getItem('token');
    const cliente = JSON.parse(localStorage.getItem('cliente'));

    if (!token || !cliente) {
        console.log("❌ No hay sesión válida");
        alert('Por favor inicia sesión primero');
        window.location.href = 'login.html';
        return;
    }

    console.log("✅ Sesión válida para:", cliente.nombre);
    
    // Mostrar nombre del usuario
    mostrarNombreUsuario(cliente);
    
    // Cargar servicios
    await cargarServicios();
    
    // Cargar tickets del usuario
    await cargarTicketsCliente(cliente.id);
    
    // Actualizar contador de tickets
    await actualizarContadorTickets(cliente.id);
});

// ===========================================
// MOSTRAR NOMBRE DE USUARIO
// ===========================================
function mostrarNombreUsuario(cliente) {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = `Hola, ${cliente.nombre} ${cliente.apellidos || ''}`;
    }
    
    const userGreeting = document.getElementById('userGreeting');
    if (userGreeting) {
        userGreeting.textContent = `Bienvenido, ${cliente.nombre}`;
    }
}

// ===========================================
// CARGAR SERVICIOS DESDE LA BD
// ===========================================
async function cargarServicios() {
    try {
        console.log("📦 Cargando servicios...");
        
        const response = await fetch(`${API_URL}/servicios`);
        const data = await response.json();

        if (data.success) {
            console.log("✅ Servicios cargados:", data.servicios.length);
            
            const selectArea = document.getElementById('area');
            if (!selectArea) return;
            
            selectArea.innerHTML = '<option value="">Selecciona un servicio</option>';
            
            // Ordenar por categoría
            data.servicios.sort((a, b) => a.Categoria.localeCompare(b.Categoria));
            
            let categoriaActual = '';
            data.servicios.forEach(servicio => {
                // Agregar separador de categoría
                if (servicio.Categoria !== categoriaActual) {
                    categoriaActual = servicio.Categoria;
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = `📁 ${categoriaActual}`;
                    selectArea.appendChild(optgroup);
                }
                
                const option = document.createElement('option');
                option.value = servicio.Id_servicio;
                option.textContent = `${servicio.Nombre_servicio} - $${servicio.Precio_cliente}`;
                option.dataset.precio = servicio.Precio_cliente;
                option.dataset.tiempo = servicio.Tiempo_estimado || '01:00:00';
                option.dataset.categoria = servicio.Categoria;
                
                // Agregar al último optgroup
                const lastOptgroup = selectArea.lastElementChild;
                if (lastOptgroup.tagName === 'OPTGROUP') {
                    lastOptgroup.appendChild(option);
                } else {
                    selectArea.appendChild(option);
                }
            });
            
            // Agregar event listener para cuando cambie la selección
            selectArea.addEventListener('change', mostrarPrecioSeleccionado);
        }
    } catch (error) {
        console.error('❌ Error al cargar servicios:', error);
        alert('Error al cargar los servicios');
    }
}

// ===========================================
// MOSTRAR PRECIO DEL SERVICIO SELECCIONADO
// ===========================================
function mostrarPrecioSeleccionado(e) {
    const select = e.target;
    const option = select.options[select.selectedIndex];
    
    if (option && option.dataset.precio) {
        const precio = parseFloat(option.dataset.precio);
        const tiempo = option.dataset.tiempo;
        
        // Mostrar precio en algún lugar (opcional)
        console.log(`💰 Servicio seleccionado: $${precio} - Tiempo: ${tiempo}`);
        
        // Actualizar el campo de costo si existe
        const costoField = document.getElementById('costoEstimado');
        if (costoField) {
            costoField.value = `$${precio}`;
        }
    }
}

// ===========================================
// CREAR NUEVO TICKET
// ===========================================
document.getElementById('formTicket')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log("📝 Creando nuevo ticket...");
    
    const cliente = JSON.parse(localStorage.getItem('cliente'));
    if (!cliente) {
        alert('Debes iniciar sesión');
        window.location.href = 'login.html';
        return;
    }
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre')?.value;
    const areaSelect = document.getElementById('area');
    const operacion = document.getElementById('operacion')?.value;
    const prioridad = document.getElementById('prioridad')?.value;
    const descripcion = document.getElementById('descripcion')?.value;
    
    // Validaciones
    if (!areaSelect || areaSelect.value === '') {
        alert('Por favor selecciona un servicio');
        return;
    }
    
    if (!operacion) {
        alert('Por favor selecciona el tipo de operación');
        return;
    }
    
    if (!prioridad) {
        alert('Por favor selecciona la prioridad');
        return;
    }
    
    if (!descripcion) {
        alert('Por favor describe el servicio que necesitas');
        return;
    }
    
    // Obtener el servicio seleccionado
    const option = areaSelect.options[areaSelect.selectedIndex];
    const servicioId = areaSelect.value;
    const precio = parseFloat(option.dataset.precio);
    const tiempo = option.dataset.tiempo;
    
    const ticketData = {
        Id_cliente: cliente.id,
        Metodo_pago: 'Pendiente',
        servicios: [{
            id: parseInt(servicioId),
            precio: precio,
            observaciones: descripcion,
            tiempo: tiempo,
            operacion: operacion,
            prioridad: prioridad
        }]
    };

    console.log("📤 Enviando datos:", ticketData);

    try {
        const response = await fetch(`${API_URL}/ventas/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(ticketData)
        });

        const data = await response.json();
        console.log("📥 Respuesta:", data);

        if (data.success) {
            alert('✅ Ticket creado exitosamente');
            mostrarTicket(data.data);
            actualizarContador();
            
            // Limpiar formulario
            document.getElementById('formTicket').reset();
        } else {
            alert('❌ Error: ' + (data.message || 'No se pudo crear el ticket'));
        }
    } catch (error) {
        console.error('❌ Error:', error);
        alert('Error de conexión con el servidor');
    }
});

// ===========================================
// MOSTRAR TICKET GENERADO
// ===========================================
function mostrarTicket(data) {
    console.log("🎫 Mostrando ticket:", data);
    
    // Actualizar elementos del ticket
    const folioElement = document.getElementById('folio');
    if (folioElement) {
        folioElement.textContent = data.folio || 'FOLIO-' + Date.now();
    }
    
    const fechaElement = document.getElementById('fecha');
    if (fechaElement) {
        const fecha = data.venta?.venta?.Fecha ? new Date(data.venta.venta.Fecha) : new Date();
        fechaElement.textContent = fecha.toLocaleString('es-MX');
    }
    
    const areaElement = document.getElementById('tArea');
    if (areaElement && data.detalles && data.detalles[0]) {
        areaElement.textContent = data.detalles[0].Nombre_servicio || 'N/A';
    }
    
    const operacionElement = document.getElementById('tOperacion');
    if (operacionElement) {
        operacionElement.textContent = document.getElementById('operacion')?.value || 'Diagnóstico';
    }
    
    const prioridadElement = document.getElementById('tPrioridad');
    if (prioridadElement) {
        prioridadElement.textContent = document.getElementById('prioridad')?.value || 'Media';
    }
    
    const tiempoElement = document.getElementById('tiempo');
    if (tiempoElement) {
        const tiempo = data.detalles?.[0]?.Tiempo_real || 'En proceso';
        tiempoElement.textContent = tiempo;
    }
    
    const costoElement = document.getElementById('costo');
    if (costoElement) {
        costoElement.textContent = `$${data.total || 0}`;
    }
    
    // Mostrar QR
    const qrDiv = document.getElementById('qrCode');
    if (qrDiv && data.qrCode) {
        qrDiv.innerHTML = `<img src="${data.qrCode}" alt="QR Code" style="width: 150px; height: 150px; border-radius: 10px;">`;
    }
    
    // Actualizar barra de progreso
    const progressBar = document.getElementById('progress');
    if (progressBar) {
        progressBar.style.width = '25%'; // 25% = En evaluación
    }
    
    const estadoElement = document.getElementById('estado');
    if (estadoElement) {
        estadoElement.textContent = 'En evaluación';
        estadoElement.className = 'estado evaluacion';
    }
}

// ===========================================
// CARGAR TICKETS DEL CLIENTE
// ===========================================
async function cargarTicketsCliente(idCliente) {
    try {
        const response = await fetch(`${API_URL}/ventas/cliente/${idCliente}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log(`📊 Tickets encontrados: ${data.tickets.length}`);
            actualizarContadorTickets(data.tickets.length);
        }
    } catch (error) {
        console.error('Error al cargar tickets:', error);
    }
}

// ===========================================
// ACTUALIZAR CONTADOR DE TICKETS
// ===========================================
function actualizarContadorTickets(cantidad) {
    const totalTickets = document.getElementById('totalTickets');
    if (totalTickets) {
        totalTickets.textContent = cantidad;
    }
}

function actualizarContador() {
    const totalTickets = document.getElementById('totalTickets');
    if (totalTickets) {
        const actual = parseInt(totalTickets.textContent) || 0;
        totalTickets.textContent = actual + 1;
    }
}

// ===========================================
// ACTUALIZAR CONTADOR DESDE BD
// ===========================================
async function actualizarContadorTickets(idCliente) {
    try {
        const response = await fetch(`${API_URL}/ventas/cliente/${idCliente}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const totalTickets = document.getElementById('totalTickets');
            if (totalTickets) {
                totalTickets.textContent = data.tickets.length;
            }
        }
    } catch (error) {
        console.error('Error al actualizar contador:', error);
    }
}

// ===========================================
// CERRAR SESIÓN
// ===========================================
window.cerrarSesion = function() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('cliente');
        window.location.href = 'login.html';
    }
};

// ===========================================
// INICIALIZAR AL CARGAR
// ===========================================
console.log("🚀 tramite-pro.js cargado correctamente");