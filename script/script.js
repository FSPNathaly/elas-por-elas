document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const menuContainer = document.getElementById("menu-container");

  if (hamburgerBtn && menuContainer) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      menuContainer.classList.toggle("active");
    });
  }

  const handleLogin = () => {
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const loginForm = document.getElementById("form-acessar-conta");
  const createAccountForm = document.getElementById("form-criar-conta");

  if (loginForm) loginForm.addEventListener("submit", handleLogin);
  if (createAccountForm)
    createAccountForm.addEventListener("submit", handleLogin);

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.removeItem("isLoggedIn");
      window.location.href = window.location.pathname.includes("/en/")
        ? "index.html"
        : "../../index.html";
    });
  }

  document.querySelectorAll(".dropdown-trigger").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      let content = button.nextElementSibling;
      document
        .querySelectorAll(".dropdown-content-autor")
        .forEach((otherContent) => {
          if (otherContent !== content) {
            otherContent.classList.remove("show");
          }
        });
      content.classList.toggle("show");
    });
  });

  window.addEventListener("click", (e) => {
    if (!e.target.matches(".dropdown-trigger")) {
      document
        .querySelectorAll(".dropdown-content-autor")
        .forEach((content) => {
          content.classList.remove("show");
        });
    }
  });

  const togglePasswordButtons = document.querySelectorAll(".toggle-senha");
  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const passwordInput = button.previousElementSibling;
      const icon = button.querySelector("img");
      const isPassword = passwordInput.type === "password";
      if (isPassword) {
        passwordInput.type = "text";
        icon.src = "../../assets/icon-eye-open.svg";
      } else {
        passwordInput.type = "password";
        icon.src = "../../assets/icon-eye-closed.svg";
      }
    });
  });

  const validateAndToggleButton = (form) => {
    if (!form) return;
    const fields = form.querySelectorAll("input[required], textarea[required]");
    const button = form.querySelector("button[type='submit']");
    if (!button || fields.length === 0) return;
    const checkValidation = () => {
      button.disabled = !Array.from(fields).every(
        (field) => field.value.trim() !== ""
      );
    };
    fields.forEach((field) => field.addEventListener("input", checkValidation));
    checkValidation();
  };

  validateAndToggleButton(loginForm);
  validateAndToggleButton(createAccountForm);
  const reportForm = document.getElementById("form-denuncia");
  if (reportForm) {
    validateAndToggleButton(reportForm);
  }

  const currentURL = window.location.href;
  const navLinks = document.querySelectorAll("#navegacao-secundaria ul li a");
  navLinks.forEach((link) => {
    if (link.href === currentURL) {
      link.classList.add("active-link");
    }
  });

  const activeLangLink = document.querySelector('.idioma a[href="#"]');
  if (activeLangLink) {
    activeLangLink.classList.add("active-link");
  }
});
