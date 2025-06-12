document.addEventListener("DOMContentLoaded", () => {
  const anexoInput = document.getElementById("anexo-input");
  const anexoContainer = document.getElementById("anexos-container");
  const addAnexoBtn = document.getElementById("add-anexo-btn");
  const reportForm = document.getElementById("form-denuncia");
  const successModal = document.getElementById("success-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  let allFiles = [];
  const MAX_FILES = 6;
  let redirectTimeout;

  if (addAnexoBtn) {
    addAnexoBtn.addEventListener("click", () => anexoInput.click());
  }

  if (anexoInput) {
    anexoInput.addEventListener("change", (event) => {
      const newFiles = Array.from(event.target.files);
      const availableSlots = MAX_FILES - allFiles.length;

      if (availableSlots > 0) {
        allFiles.push(...newFiles.slice(0, availableSlots));
      }

      updateAnexoPreviews();
      anexoInput.value = "";
    });
  }

  if (reportForm && successModal && closeModalBtn) {
    reportForm.addEventListener("submit", function (event) {
      event.preventDefault();
      successModal.classList.add("active");

      redirectTimeout = setTimeout(() => {
        redirectToPage();
      }, 5000);
    });

    closeModalBtn.addEventListener("click", function () {
      clearTimeout(redirectTimeout);
      redirectToPage();
    });
  }

  function redirectToPage() {
    if (successModal.classList.contains("active")) {
      successModal.classList.remove("active");
    }

    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const isEnglishPage = window.location.pathname.includes("/en/");

    if (isEnglishPage) {
      window.location.href = isLoggedIn ? "home.html" : "index.html";
    } else {
      window.location.href = isLoggedIn ? "inicio.html" : "../../index.html";
    }
  }

  function updateAnexoPreviews() {
    if (!anexoContainer) return;

    anexoContainer
      .querySelectorAll(".anexo-preview-wrapper")
      .forEach((wrapper) => wrapper.remove());

    allFiles.forEach((file, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "anexo-preview-wrapper anexo-box";

      const removerBtn = document.createElement("button");
      removerBtn.className = "remover-anexo";
      removerBtn.innerHTML = "&times;";
      removerBtn.onclick = (e) => {
        e.stopPropagation();
        removeFile(index);
      };
      wrapper.appendChild(removerBtn);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          img.className = "anexo-preview-img";
          wrapper.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else {
        const fileInfo = document.createElement("div");
        fileInfo.className = "file-info-preview";
        const icon = getFileIcon(file.type);
        fileInfo.innerHTML = `${icon}<span>${file.name}</span>`;
        wrapper.appendChild(fileInfo);
      }
      anexoContainer.insertBefore(wrapper, addAnexoBtn);
    });

    if (addAnexoBtn) {
      addAnexoBtn.style.display =
        allFiles.length >= MAX_FILES ? "none" : "flex";
    }
  }

  function removeFile(indexToRemove) {
    allFiles.splice(indexToRemove, 1);
    updateAnexoPreviews();
  }

  function getFileIcon(fileType) {
    if (fileType.startsWith("audio/")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z"/></svg>`;
    }
    if (fileType.startsWith("video/")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 6V17.5C16.5 20.2614 14.2614 22.5 11.5 22.5C8.73858 22.5 6.5 20.2614 6.5 17.5V5C6.5 3.067 8.067 1.5 10 1.5C11.933 1.5 13.5 3.067 13.5 5V15.5C13.5 16.6046 12.6046 17.5 11.5 17.5C10.3954 17.5 9.5 16.6046 9.5 15.5V6'/></svg>`;
  }
});
