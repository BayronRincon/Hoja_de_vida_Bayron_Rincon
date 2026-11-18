// ============================================
// HOJA DE VIDA - JAVASCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Tema claro / oscuro (se recuerda al recargar) ---------- */
  const btnTema = document.getElementById("btn-tema");
  if (localStorage.getItem("tema") === "claro") {
    document.body.classList.add("tema-claro");
  }
  if (btnTema) {
    btnTema.textContent = document.body.classList.contains("tema-claro") ? "🌙" : "☀️";
    btnTema.addEventListener("click", () => {
      document.body.classList.toggle("tema-claro");
      const claro = document.body.classList.contains("tema-claro");
      localStorage.setItem("tema", claro ? "claro" : "oscuro");
      btnTema.textContent = claro ? "🌙" : "☀️";
    });
  }

  /* ---------- 2. Menú móvil ---------- */
  const btnMenu = document.getElementById("btn-menu");
  const menu = document.getElementById("menu");
  if (btnMenu && menu) {
    btnMenu.addEventListener("click", () => menu.classList.toggle("abierto"));
  }

  /* ---------- 3. Aparecer elementos al hacer scroll ---------- */
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");

          // Si dentro hay barras de habilidades, se animan
          entrada.target.querySelectorAll(".barra-relleno").forEach((barra) => {
            barra.style.width = barra.dataset.nivel + "%";
          });
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".oculto").forEach((el) => observador.observe(el));

  /* ---------- 4. Contadores animados ---------- */
  document.querySelectorAll("[data-contador]").forEach((el) => {
    const meta = parseInt(el.dataset.contador, 10);
    let actual = 0;
    const paso = Math.max(1, Math.ceil(meta / 40));
    const intervalo = setInterval(() => {
      actual += paso;
      if (actual >= meta) {
        actual = meta;
        clearInterval(intervalo);
      }
      el.textContent = actual;
    }, 40);
  });

  /* ---------- 5. Validación del formulario de contacto ---------- */
  const formulario = document.getElementById("form-contacto");
  if (formulario) {
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      let valido = true;

      const nombre = formulario.nombre;
      const correo = formulario.correo;
      const mensaje = formulario.mensaje;
      const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      mostrarError("error-nombre", nombre.value.trim().length < 3 ? "Escribe tu nombre (mínimo 3 letras)." : "");
      mostrarError("error-correo", !patronCorreo.test(correo.value) ? "Escribe un correo válido." : "");
      mostrarError("error-mensaje", mensaje.value.trim().length < 10 ? "El mensaje debe tener al menos 10 caracteres." : "");

      valido =
        nombre.value.trim().length >= 3 &&
        patronCorreo.test(correo.value) &&
        mensaje.value.trim().length >= 10;

      if (valido) {
        document.getElementById("mensaje-ok").style.display = "block";
        formulario.reset();
      }
    });
  }

  function mostrarError(id, texto) {
    document.getElementById(id).textContent = texto;
  }

  /* ---------- 6. Año automático en el pie de página ---------- */
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
});
