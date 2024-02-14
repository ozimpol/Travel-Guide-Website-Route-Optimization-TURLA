// Fonksiyon: Bir kart oluşturur
function createCard(cardData) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('data-category', cardData.category);

  const header = document.createElement('header');
  header.className = 'card-header';
  header.style.backgroundImage = `url('${cardData.image}')`;

  const title = document.createElement('h4');
  title.className = 'card-header--title';

  const body = document.createElement('div');
  body.className = 'card-body';

  const heading = document.createElement('h2');
  heading.textContent = cardData.title;

  const heading2 = document.createElement('h4');
  heading2.textContent = cardData.category;

  const paragraph = document.createElement('p');
  paragraph.className = 'body-content';


  // Buton oluşturma
  const button = document.createElement('button');
  button.className = 'button button-primary';
  button.innerHTML = '<i class="fa fa-chevron-right"></i> See Details.';
  button.addEventListener('click', function() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function() {
      modalContainer.classList.remove('active');
    });
    
    const enlargedImage = document.createElement('img');
    enlargedImage.src = cardData.image;
    enlargedImage.style.height = '300px';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = cardData.title;
    
    const modalDescription = document.createElement('p');
    modalDescription.textContent = cardData.description;
    
    const googleMapsButton = document.createElement('a');
    const formattedTitle = encodeURIComponent(cardData.title.replace(/\s/g, '+'));
    googleMapsButton.href = `https://www.google.com/maps/search/${formattedTitle}+adana`;
    googleMapsButton.textContent = 'See on Google Maps';
    
    modalContent.appendChild(closeButton); // Kapatma butonunu ekle
    modalContent.appendChild(enlargedImage);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalDescription);
    modalContent.appendChild(googleMapsButton);
    modal.appendChild(modalContent);
    
    const modalContainer = document.getElementById('modal-container');
    modalContainer.appendChild(modal); // Modali modalContainer'a ekle
    modalContainer.classList.add('active');
  });


  header.appendChild(title);
  body.appendChild(heading);
  body.appendChild(heading2);
  body.appendChild(button);

  card.appendChild(header);
  card.appendChild(body);

  return card;
}

window.addEventListener('load', function() {
  const buttons = document.querySelectorAll('.buttons button');
  const cardContainer = document.getElementById('card-container');

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const cards = data.map(createCard);
      cardContainer.append(...cards);

      buttons.forEach(button => {
        button.addEventListener('click', function() {
          const category = this.getAttribute('data-sort');

          cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'sort-all' || cardCategory === category) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });

          buttons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
        });
      });
    })
    .catch(error => console.error('Veri alma hatası:', error));
});
