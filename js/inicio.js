// ================= LOADER =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader?.classList.add("hide"), 1000);
});

// ================= SALUDO DINÁMICO =================
window.addEventListener("DOMContentLoaded", () => {
  const userGreeting = document.getElementById("userGreeting");
  if (userGreeting) {
    const hora = new Date().getHours();
    let saludo = "¡Buenas noches!";
    if (hora >= 6 && hora < 12) saludo = "¡Buenos días!";
    else if (hora >= 12 && hora < 18) saludo = "¡Buenas tardes!";
    userGreeting.textContent = saludo;
  }

  const floating = document.querySelector(".floating-icons");
  if (floating) {
    floating.style.opacity = 0;
    floating.style.transform = "translateY(30px)";
    setTimeout(() => {
      floating.style.transition = "all 0.6s ease";
      floating.style.opacity = 1;
      floating.style.transform = "translateY(0)";
    }, 500);
  }
});

// ================= HAMBURGUESA =================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
hamburger?.addEventListener("click", () => {
  navMenu?.classList.toggle("show");
  hamburger.classList.toggle("active");
});

// ================= LOGO FUTURISTA =================
const logo = document.querySelector(".logo");
if (logo) {
  let float = 0;
  function animateLogo() {
    float += 0.02;
    logo.style.transform = `
      translateY(${Math.sin(float) * 8}px)
      rotateY(${Math.sin(float) * 5}deg)
    `;
    requestAnimationFrame(animateLogo);
  }
  animateLogo();

  setInterval(() => {
    logo.style.boxShadow = `
      0 0 30px rgba(108,99,255,0.8),
      0 0 60px rgba(0,240,255,0.5)
    `;
    setTimeout(() => {
      logo.style.boxShadow = "0 25px 70px rgba(0,0,0,0.6)";
    }, 800);
  }, 4000);

  logo.addEventListener("mousemove", (e) => {
    const rect = logo.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    logo.style.transform = `
      rotateY(${x * 15}deg)
      rotateX(${y * -15}deg)
      scale(1.05)
    `;
  });
  logo.addEventListener("mouseleave", () => {
    logo.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  });
}

// ================= EFECTO 3D VIDEO =================
if (window.innerWidth > 768) {
  const videoContainer = document.querySelector('.about-video');
  const video = videoContainer?.querySelector('video');
  if (videoContainer && video) {
    videoContainer.addEventListener('mousemove', e => {
      const rect = videoContainer.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
      video.style.transform = `rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg) scale(1.05)`;
    });
    videoContainer.addEventListener('mouseleave', () => {
      video.style.transform = 'rotateY(0) rotateX(0) scale(1)';
    });
  }
}

// ================= MODALES =================
const modales = [
  { btn: "btnQuienes", modal: "modalQuienes" },
  { btn: "btnServicios", modal: "modalServicios" },
  { btn: "btnGaleria", modal: "modalGaleria" },
];

modales.forEach(({ btn, modal }) => {
  const button = document.getElementById(btn);
  const modalEl = document.getElementById(modal);
  const closeBtn = modalEl?.querySelector(".close");

  button?.addEventListener("click", () => modalEl.classList.add("show"));
  closeBtn?.addEventListener("click", () => modalEl.classList.remove("show"));
  window.addEventListener("click", e => {
    if (e.target === modalEl) modalEl.classList.remove("show");
  });
});

// ================= MODAL LOGIN =================
const loginModal = document.getElementById("modalLogin");
const loginBtnModal = document.getElementById("btnLoginModal");
const loginClose = loginModal?.querySelector(".close");
const ticketLink = document.querySelector('a[href="ticket.html"]');

ticketLink?.addEventListener("click", e => {
  e.preventDefault();
  loginModal.classList.add("show");
});

loginClose?.addEventListener("click", () => loginModal.classList.remove("show"));
loginBtnModal?.addEventListener("click", () => window.location.href = "login.html");

// ================= ADMINISTRADORES Y SOPORTE =================
const adminLink = document.querySelector('a[href="admin.html"]');
const soporteLink = document.querySelector('a[href="soporte.html"]');

asdminLink?.addEventListener("click", e => { e.preventDefault(); window.location.href="admin.html"; });
soporteLink?.addEventListener("click", e => { e.preventDefault(); window.location.href="soporte.html"; });

// ================= GALERÍA CON LUPA =================
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    const src = item.querySelector("img").src;
    const modalZoom = document.createElement("div");
    modalZoom.classList.add("modal");
    modalZoom.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <img src="${src}" style="width:100%; border-radius:20px;">
      </div>
    `;
    document.body.appendChild(modalZoom);
    modalZoom.classList.add("show");

    const closeZoom = modalZoom.querySelector(".close");
    closeZoom.addEventListener("click", () => modalZoom.remove());
    modalZoom.addEventListener("click", e => {
      if (e.target === modalZoom) modalZoom.remove();
    });
  });
});
