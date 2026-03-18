// ================= VARIABLES =================
let tickets = [];
let notes = "";

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

// ================= MODAL TICKET =================
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

// ================= TICKETS =================
function renderTickets(){
  const tbody = document.getElementById("ticketsTable");
  if(!tbody) return;
  tbody.innerHTML = "";
  tickets.forEach(t=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.client}</td>
      <td>${t.subject}</td>
      <td>${t.type}</td>
      <td>${t.status}</td>
      <td>
        <button class="btn-icon" onclick="deleteTicket(${t.id})"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addTicket(client, subject, type, status){
  const id = Date.now();
  tickets.push({
    id,
    client: client.value,
    subject: subject.value,
    type: type.value,
    status: status.value
  });
  renderTickets();
  showToast(`Ticket "${subject.value}" agregado`);
  client.value=""; subject.value=""; type.value="Queja de servicio"; status.value="Abierto";
}

function deleteTicket(id){
  const t = tickets.find(ticket=>ticket.id===id);
  tickets = tickets.filter(ticket=>ticket.id!==id);
  renderTickets();
  showToast(`Ticket "${t.subject}" eliminado`);
}

// ================= NOTAS =================
const quickNotes = document.getElementById("quickNotes");
const saveNoteBtn = document.getElementById("saveNoteBtn");
saveNoteBtn?.addEventListener("click", ()=>{
  notes = quickNotes.value;
  showToast("Notas guardadas");
});

// ================= MODAL SETUP =================
setupModal(
  "addTicketBtn",
  "modalAddTicket",
  "saveTicketBtn",
  ["ticketClient","ticketSubject","ticketType","ticketStatus"],
  addTicket
);

// ================= HAMBURGUESA =================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
hamburger.addEventListener("click", ()=>{
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("show");
});

// ================= INICIALIZAR =================
renderTickets();