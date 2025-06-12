document.addEventListener("DOMContentLoaded", () => {
  const allFaqItems = document.querySelectorAll(".faq-item");

  allFaqItems.forEach((item) => {
    item.addEventListener("toggle", (event) => {
      if (item.open) {
        allFaqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.open) {
            otherItem.open = false;
          }
        });
      }
    });
  });
});
