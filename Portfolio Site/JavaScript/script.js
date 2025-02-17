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

// ===============================
// スクロール関連の処理
// ===============================
document.addEventListener('scroll', toggleButtons);
window.addEventListener('load', toggleButtons);

function toggleButtons() {
  const buttonTop = document.querySelector('.scroll-to-top');
  const buttonBottom = document.querySelector('.scroll-to-bottom');
  
  const scrollPosition = window.scrollY;
  const headerBottom = document.querySelector('header').getBoundingClientRect().bottom;
  const footerTop = document.querySelector('footer').getBoundingClientRect().top;
  const halfDistance = headerBottom + (footerTop - headerBottom) / 2 + 600;

  buttonTop.style.display = scrollPosition > halfDistance ? 'block' : 'none';
  buttonBottom.style.display = scrollPosition <= halfDistance ? 'block' : 'none';
}

document.querySelector('.scroll-to-top').addEventListener('click', () => {
  const targetBlock = document.querySelector('.flex'); 
  const blockPosition = targetBlock.getBoundingClientRect().top + window.scrollY;
  const offset = window.innerHeight / 2 - targetBlock.clientHeight / 12; 
  window.scrollTo({ top: blockPosition - offset, behavior: 'smooth' }); 
});

document.querySelector('.scroll-to-bottom').addEventListener('click', () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.scroll-block').forEach(block => {
  block.addEventListener('click', () => {
      const targetClass = block.getAttribute('data-target');
      const targetElement = document.querySelector(targetClass);

      if (targetElement) {
          const scrollToPosition = targetElement.getBoundingClientRect().top + window.scrollY - 200;
          window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
      }
  });
});

// ===============================
// グリッドアイテムのホバーエフェクト
// ===============================
document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('mouseover', () => {
    item.style.textShadow = item.style.color === 'black'
      ? '2px 2px 4px rgba(255, 255, 255, 0.8)'
      : '2px 2px 4px rgba(0, 0, 0, 0.8)';
  });

  item.addEventListener('mouseout', () => {
    item.style.textShadow = ''; 
  });
});

// ===============================
// ナビゲーションバーのアニメーション
// ===============================
function animateColor() {
  let step = 0;
  const colors = [
    "rgba(0, 0, 30, 0.8)",   
    "rgba(0, 0, 60, 0.8)",   
    "rgba(0, 0, 90, 0.8)",   
    "rgba(0, 0, 120, 0.8)",  
  ];
  
  let currentColorIndex = 0;

  function updateColor() {
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    const ratio = step / 100;

    const currentColor = colors[currentColorIndex].match(/\d+/g).map(Number);
    const nextColor = colors[nextColorIndex].match(/\d+/g).map(Number);

    navbar.style.background = `rgba(${
      Math.round((currentColor[0] * (1 - ratio)) + (nextColor[0] * ratio))}, ${
      Math.round((currentColor[1] * (1 - ratio)) + (nextColor[1] * ratio))}, ${
      Math.round((currentColor[2] * (1 - ratio)) + (nextColor[2] * ratio))}, 0.8)`;

    step = (step + 1) % 100;

    setTimeout(updateColor, 10);
  }

  updateColor();
}

toggleButton.addEventListener('click', () => {
  navbar.style.left = navbar.style.left === '0%' ? '-100%' : '0%'; 
  animateColor();
});

// ===============================
// バブルアニメーション
// ===============================
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.style.width = `${Math.random() * 40 + 10}px`;
  bubble.style.height = bubble.style.width;
  bubble.style.left = `${Math.random() * 100}vw`;
  bubble.style.animation = `rise ${Math.random() * 2 + 3}s linear forwards`; 

  document.querySelector('.bubble-container').appendChild(bubble);

  bubble.addEventListener('animationend', () => bubble.remove());
}

setInterval(createBubble, 250);

// ===============================
// ライトボックス（画像拡大表示）
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const close = document.getElementById('close');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
          lightbox.style.display = 'flex';
          lightboxImg.src = trigger.src;
      });
  });

  close.addEventListener('click', () => {
      lightbox.style.display = 'none'; 
  });

  lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) {
          lightbox.style.display = 'none'; 
      }
  });
});
