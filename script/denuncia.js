document.addEventListener("DOMContentLoaded", () => {
  const anexoInput = document.getElementById("anexo-input");
  const anexoContainer = document.getElementById("anexos-container");
  const addAnexoBtn = document.getElementById("add-anexo-btn");

  let allFiles = [];

  addAnexoBtn.addEventListener("click", () => anexoInput.click());

  anexoInput.addEventListener("change", (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.slice(0, 6 - allFiles.length);
    allFiles = [...allFiles, ...newFiles];
    updateAnexoPreviews();

    anexoInput.value = "";
  });

  function updateAnexoPreviews() {
    const anexoBoxes = anexoContainer.querySelectorAll(
      ".anexo-box:not(.anexo-box-add)"
    );

    anexoBoxes.forEach((box, index) => {
      box.innerHTML = "";
      box.style.backgroundImage =
        "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.5 6V17.5C16.5 20.2614 14.2614 22.5 11.5 22.5C8.73858 22.5 6.5 20.2614 6.5 17.5V5C6.5 3.067 8.067 1.5 10 1.5C11.933 1.5 13.5 3.067 13.5 5V15.5C13.5 16.6046 12.6046 17.5 11.5 17.5C10.3954 17.5 9.5 16.6046 9.5 15.5V6' stroke='%23d1d1d1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A\")";
      box.style.borderStyle = "dashed";

      if (allFiles[index]) {
        const file = allFiles[index];
        box.style.backgroundImage = "none";
        box.style.borderStyle = "solid";

        const removerBtn = document.createElement("button");
        removerBtn.className = "remover-anexo";
        removerBtn.innerHTML = "&times;";
        removerBtn.onclick = (e) => {
          e.stopPropagation();
          removeFile(index);
        };
        box.appendChild(removerBtn);

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            const img = document.createElement("img");
            img.src = reader.result;
            img.className = "anexo-preview";
            box.appendChild(img);
          };
          reader.readAsDataURL(file);
        } else {
          const fileInfo = document.createElement("div");
          fileInfo.className = "file-info-preview";
          const icon = getFileIcon(file.type);
          fileInfo.innerHTML = `${icon}<span>${file.name}</span>`;
          box.appendChild(fileInfo);
        }
      }
    });

    addAnexoBtn.style.display = allFiles.length >= 6 ? "none" : "flex";
  }

  function removeFile(indexToRemove) {
    allFiles = allFiles.filter((_, index) => index !== indexToRemove);
    updateAnexoPreviews();
  }

  function getFileIcon(fileType) {
    if (fileType.startsWith("audio/")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z"/></svg>`;
    }
    if (fileType.startsWith("video/")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>`;
    }
    return "";
  }
});
