// ===============================
// モーダルの表示と非表示
// ===============================
function showDetails(language) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");

  modalTitle.textContent = '';
  console.log(`Fetching details for: ${language}`);

  fetch(`programming/${language}.md`)
    .then(response => {
      console.log(`Response status for ${language}: ${response.status}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      modalDescription.innerHTML = marked(data);
      modal.style.display = "block"; 
    })
    .catch(error => {
      console.error("Error loading language detail:", error);
      modalDescription.textContent = `詳細情報の読み込みに失敗しました: ${error.message}`;
      modal.style.display = "block"; 
    });
}

function closeModal() {
  document.getElementById("modal").style.display = "none"; 
}

window.onclick = function(event) {
  if (event.target === document.getElementById("modal")) {
    closeModal();
  }
};
