document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const menuContainer = document.getElementById("menu-container");

  if (hamburgerBtn && menuContainer) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      menuContainer.classList.toggle("active");
    });
  }

  const botaoAcessar = document.querySelector(".botao-acessar");
  if (botaoAcessar) {
    botaoAcessar.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "pages/pt/acessar-conta.html";
    });
  }

  const githubIcon = document.getElementById("github-icon");
  const linkedinIcon = document.getElementById("linkedin-icon");
  const githubDropdown = document.getElementById("github-dropdown-content");
  const linkedinDropdown = document.getElementById("linkedin-dropdown-content");

  if (githubIcon && linkedinIcon && githubDropdown && linkedinDropdown) {
    function toggleDropdown(dropdown) {
      dropdown.classList.toggle("mostrar");
    }

    function fecharDropdowns(event) {
      if (
        !githubIcon.contains(event.target) &&
        !githubDropdown.contains(event.target)
      ) {
        githubDropdown.classList.remove("mostrar");
      }
      if (
        !linkedinIcon.contains(event.target) &&
        !linkedinDropdown.contains(event.target)
      ) {
        linkedinDropdown.classList.remove("mostrar");
      }
    }

    githubIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      linkedinDropdown.classList.remove("mostrar");
      toggleDropdown(githubDropdown);
    });

    linkedinIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      githubDropdown.classList.remove("mostrar");
      toggleDropdown(linkedinDropdown);
    });

    window.addEventListener("click", fecharDropdowns);
  }

  const togglePasswordButtons = document.querySelectorAll(".toggle-senha");

  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const passwordInput = button.previousElementSibling;
      const icon = button.querySelector("img");
      const isPassword = passwordInput.type === "password";

      if (isPassword) {
        passwordInput.type = "text";
        icon.src = "../../assets/icon-eye-open.svg";
        button.setAttribute("aria-label", "Ocultar senha");
      } else {
        passwordInput.type = "password";
        icon.src = "../../assets/icon-eye-closed.svg";
        button.setAttribute("aria-label", "Mostrar senha");
      }
    });
  });
});
