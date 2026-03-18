// ================= VARIABLES =================
let clientes = [];
let servicios = [];

// ================= TOAST =================
const toast = document.getElementById("toast");
function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.style.opacity = 1;
  toast.style.transform = "translateY(0)";
  setTimeout(()=>{
    toast.style.opacity = 0;
    toast.style.transform = "translateY(-20px)";
  },2500);
}

// ================= HAMBURGUESA =================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");   // Animación hamburguesa
  navMenu.classList.toggle("show");       // Mostrar / ocultar menú lateral
});

// Cerrar menú al hacer click en un enlace
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("show");
  });
});

// ================= MODALES =================
function setupModal(btnId, modalId, saveBtnId, inputIds, saveCallback){
  const btn = document.getElementById(btnId);
  const modal = document.getElementById(modalId);
  const close = modal?.querySelector(".close");
  const saveBtn = document.getElementById(saveBtnId);

  btn?.addEventListener("click",()=> modal.style.display="block");
  close?.addEventListener("click",()=> modal.style.display="none");
  window.addEventListener("click", e => { if(e.target===modal) modal.style.display="none"; });

  saveBtn?.addEventListener("click", () => {
    const inputs = inputIds.map(id=>document.getElementById(id));
    saveCallback(...inputs);
    modal.style.display="none";
  });
}

// ================= CLIENTES =================
function renderClientes(){
  const tbody = document.getElementById("clientesTable");
  if(!tbody) return;
  tbody.innerHTML = "";
  clientes.forEach(c=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nombre}</td>
      <td>${c.correo}</td>
      <td>
        <button class="btn-icon" onclick="eliminarCliente(${c.id})"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function agregarCliente(name,email){
  if(!name.value.trim() || !email.value.trim()){
    showToast("Por favor completa todos los campos");
    return;
  }
  const id = Date.now();
  clientes.push({id,nombre:name.value,correo:email.value});
  refreshDashboardPro();
  showToast(`Cliente "${name.value}" agregado`);
  name.value=""; email.value="";
}

function eliminarCliente(id){
  const cliente = clientes.find(c=>c.id===id);
  clientes = clientes.filter(c=>c.id!==id);
  refreshDashboardPro();
  showToast(`Cliente "${cliente.nombre}" eliminado`);
}

// ================= SERVICIOS =================
function renderServicios(){
  const tbody = document.getElementById("servicesTable");
  if(!tbody) return;
  tbody.innerHTML = "";
  servicios.forEach(s=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.nombre}</td>
      <td>
        <button class="btn-icon" onclick="eliminarServicio(${s.id})"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function agregarServicio(name){
  if(!name.value.trim()){
    showToast("Por favor ingresa el nombre del servicio");
    return;
  }
  const id = Date.now();
  servicios.push({id,nombre:name.value});
  refreshDashboardPro();
  showToast(`Servicio "${name.value}" agregado`);
  name.value="";
}

function eliminarServicio(id){
  const service = servicios.find(s=>s.id===id);
  servicios = servicios.filter(s=>s.id!==id);
  refreshDashboardPro();
  showToast(`Servicio "${service.nombre}" eliminado`);
}

// ================= MODALES SETUP =================
setupModal("addClientBtn","modalAddClient","saveClientBtn",["clientNameInput","clientEmailInput"],agregarCliente);
setupModal("addServiceModalBtn","modalAddService","saveServiceBtn",["serviceNameInput"],agregarServicio);

// ================= GRÁFICAS FUTURISTAS =================
function actualizarGraficasPro(){
  const clientesRegistrados = clientes.length;
  const clientesConServicios = clientes.reduce((acc)=> acc + Math.floor(Math.random()*4), 0);

  const ctx = document.getElementById('clientesChart').getContext('2d');
  if(window.clientesChartInstance) window.clientesChartInstance.destroy();

  window.clientesChartInstance = new Chart(ctx,{
    type:'bar',
    data:{
      labels:['Clientes Registrados','Servicios Adquiridos'],
      datasets:[{
        label:'Cantidad',
        data:[clientesRegistrados,clientesConServicios],
        backgroundColor:['rgba(108,99,255,0.7)','rgba(0,240,255,0.7)'],
        borderColor:['var(--primary)','var(--accent)'],
        borderWidth:2,
        borderRadius:12,
        hoverBackgroundColor:['rgba(108,99,255,1)','rgba(0,240,255,1)'],
        hoverBorderColor:['var(--accent)','var(--primary)']
      }]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{display:false},
        tooltip:{
          enabled:true,
          backgroundColor:'rgba(108,99,255,0.9)',
          titleColor:'#fff',
          bodyColor:'#fff',
          displayColors:false,
          callbacks:{label: ctx => `${ctx.dataset.label}: ${ctx.raw}`}
        }
      },
      animation:{duration:1200,easing:'easeOutBounce'},
      scales:{
        y:{beginAtZero:true,ticks:{color:'#fff'},grid:{color:'rgba(108,99,255,0.2)'}},
        x:{ticks:{color:'#fff',font:{weight:'600'}},grid:{color:'rgba(108,99,255,0.1)'}}
      }
    }
  });
}

// ================= REFRESH DASHBOARD =================
function refreshDashboardPro(){
  renderClientes();
  renderServicios();
  actualizarGraficasPro();
}

// ================= INICIALIZAR =================
refreshDashboardPro();