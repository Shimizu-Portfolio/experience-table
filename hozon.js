document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.fade-in');
  let hasAnimated = false;

  const checkVisibility = () => {
      const triggerBottom = window.innerHeight / 5 * 4;

      if (hasAnimated) return;

      items.forEach((item, index) => {
          const itemTop = item.getBoundingClientRect().top;

          if (itemTop < triggerBottom) {
              setTimeout(() => {
                  item.classList.add('visible');
                  if (index === items.length - 1) {
                      hasAnimated = true;
                  }
              }, index * 100);
          }
      });
  };

  checkVisibility();
  window.addEventListener('scroll', checkVisibility);
});

function showDetails(language) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");

  modalTitle.textContent = '';
  console.log(`Fetching details for: ${language}`);

  fetch(`programming/${language}.md`)
    .then((response) => {
      console.log(`Response status for ${language}: ${response.status}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      modalDescription.innerHTML = marked(data);
      modal.style.display = "block";
    })
    .catch((error) => {
      console.error("Error loading language detail:", error);
      modalDescription.textContent = `詳細情報の読み込みに失敗しました: ${error.message}`;
      modal.style.display = "block";
    });
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
      closeModal();
  }
};
