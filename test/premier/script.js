
const section = document.querySelector('main section');
const searchInput = document.getElementById('btn-Search');
const regionSelect = document.getElementById('select-Region');



const cardsContainer = document.createElement('div');
cardsContainer.className = 'cards';
section.appendChild(cardsContainer);

// Modal dynamique
const modal = document.createElement('div');
modal.className = 'modal';
// modal.innerHTML = `
//   <div class="modal__content">
//     <div class="modal__header">
//       <h2 id="m-title"></h2>
//       <button class="modal__close" id="m-close" aria-label="Fermer">✕</button>
//     </div>
//     <div class="modal__body">
//       <div class="modal__images" id="m-images"></div>
//       <p id="m-desc"></p>
//       <div class="modal__meta">
//         <div class="meta__item"><strong>Landmarks:</strong> <span id="m-landmarks"></span></div>
//         <div class="meta__item"><strong>Histoire:</strong> <span id="m-history"></span></div>
//         <div class="meta__item"><strong>Popularité:</strong> <span id="m-pop"></span>%</div>
//         <div class="meta__item"><strong>Carte:</strong> <a id="m-map" href="#" target="_blank">Voir sur Google Maps</a></div>
//       </div>
//       <div class="links">
//         <a id="m-wiki" href="#" target="_blank">Lire sur Wikipédia</a>
//       </div>
//     </div>
//   </div>
// `;
modal.innerHTML = `
  <div class="modal__content">
    <div class="modal__header">
      <h2 id="m-title"></h2>
      <button class="modal__close" id="m-close" aria-label="Fermer">✕</button>
    </div>
    <div class="modal__body">
      <div class="modal__images" id="m-images"></div>
      <p id="m-desc"></p>
      <div class="modal__meta">
        <div class="meta__item"><strong>Landmarks:</strong> <span id="m-landmarks"></span></div>
        <div class="meta__item"><strong>Histoire:</strong> <span id="m-history"></span></div>
        <div class="meta__item"><strong>Popularité:</strong> <span id="m-pop"></span>%</div>
        <div class="meta__item"><strong>Carte:</strong> <a id="m-map" href="#" target="_blank">Voir sur Google Maps</a></div>
      </div>
      <div class="links">
        <a id="m-wiki" href="#" target="_blank">Lire sur Wikipédia</a>
      </div>
      <!-- Calendrier événements -->
      <div class="events">
        <h3>Événements à venir</h3>
        <ul id="m-events"></ul>
      </div>
    </div>
  </div>
`;


document.body.appendChild(modal);
const mTitle = document.getElementById('m-title');
const mClose = document.getElementById('m-close');
const mImages = document.getElementById('m-images');
const mDesc = document.getElementById('m-desc');
const mLandmarks = document.getElementById('m-landmarks');
const mHistory = document.getElementById('m-history');
const mPop = document.getElementById('m-pop');
const mMap = document.getElementById('m-map');
const mWiki = document.getElementById('m-wiki');
const mEvents = document.getElementById('m-events');


let citiesData = []; // stocke les données

// Charger data.json via fetch()
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    citiesData = data;
    renderCards();
  })
  .catch(err => {
    console.error('Erreur de chargement des données:', err);
    section.innerHTML = '<p>Impossible de charger les données. Vérifie data.json.</p>';
  });

// Fonction d’affichage des cartes
function renderCards(list=citiesData) {
  cardsContainer.innerHTML = '';

  for (let i = 0; i < list.length; i++) {
    const city = list[i];

    // Créer la carte
    const card = document.createElement('div');
    card.className = 'card';

    // Bannière (image de fond)
    const banner = document.createElement('div');
    banner.className = 'card__banner';
    banner.style.backgroundImage = `url('${city.images[0]}')`;
    card.appendChild(banner);

    // Contenu
    const content = document.createElement('div');
    content.className = 'card__content';

    // Titre + badge région
    const titleRow = document.createElement('div');
    titleRow.className = 'card__title';
    const title = document.createElement('h3');
    title.textContent = city.name;
    const badge = document.createElement('span');
    badge.className = 'badge';
    // Affiche la région avec capitalisation simple
    badge.textContent = city.regionMaroc === 'sud' ? 'Sud' : (city.regionMaroc === 'north' ? 'Nord' : 'Centre');
    titleRow.appendChild(title);
    titleRow.appendChild(badge);

    // Mini galerie interne (2 images)
    const gallery = document.createElement('div');
    gallery.className = 'gallery';
    const img2 = document.createElement('img');
    img2.src = city.images[1];
    img2.alt = city.name + ' image 2';
    const img3 = document.createElement('img');
    img3.src = city.images[2];
    img3.alt = city.name + ' image 3';
    gallery.appendChild(img2);
    gallery.appendChild(img3);

    // Description courte
    const desc = document.createElement('p');
    desc.className = 'card__desc';
    desc.textContent = city.description;

    
    const btn = document.createElement('button');
    btn.className = 'card__btn';
    btn.textContent = 'Voir plus';
    btn.addEventListener('click', function () {
      openModal(city);
    });

  
    content.appendChild(titleRow);
    content.appendChild(gallery);
    content.appendChild(desc);
    content.appendChild(btn);
    card.appendChild(content);
    cardsContainer.appendChild(card);
  }
}

// Ouvrir la modal avec détails
// function openModal(city) {
//   mTitle.textContent = city.name;
//   mImages.innerHTML = '';
//   for (let i = 0; i < city.images.length; i++) {
//     const im = document.createElement('img');
//     im.src = city.images[i];
//     im.alt = city.name + ' ' + (i + 1);
//     mImages.appendChild(im);
//   }
//   mDesc.textContent = city.description;
//   mLandmarks.textContent = city.landmarks;
//   mHistory.textContent = city.history;
//   mPop.textContent = city.popularity;
//   mMap.href = city.map;
//   mWiki.href = city.wiki;

//  modal.classList.add('show');
// }
function openModal(city) {
  mTitle.textContent = city.name;
  mImages.innerHTML = '';
  for (let i = 0; i < city.images.length; i++) {
    const im = document.createElement('img');
    im.src = city.images[i];
    im.alt = city.name + ' ' + (i + 1);
    mImages.appendChild(im);
  }
  mDesc.textContent = city.description;
  mLandmarks.textContent = city.landmarks;
  mHistory.textContent = city.history;
  mPop.textContent = city.popularity;
  mMap.href = city.map;
  mWiki.href = city.wiki;


if (city.events && city.events.length > 0) {
  mEvents.innerHTML = city.events.map(ev => `
    <li>
      <strong>${ev.title}</strong>
      <span> ${ev.date}</span><br>
      <span>${ev.desc}</span>
    </li>
  `).join('');
} else {
  mEvents.innerHTML = '<li>Aucun événement prévu actuellement.</li>';
}


  modal.classList.add('show');
}


mClose.addEventListener('click', () => modal.classList.remove('show'));
// modal.addEventListener('click', (e) => {
//     console.log(e.target);
//   if (e.target === modal) modal.classList.remove('show');
//    console.log(e.target);
// });
// Filtrage par recherche + région
function applyFilters() {
  const keyword = (searchInput.value).toLowerCase().trim();
  const regionValue = regionSelect.value; // "all", "north", "sud" ...

  const filtered = [];
  for (let i = 0; i < citiesData.length; i++) {
    const c = citiesData[i];

    const matchKeyword = c.name.toLowerCase().indexOf(keyword) !== -1;
    // Si la valeur de select est "north" ou "sud", on filtre. Sinon, on considère "all".
    const matchRegion = (regionValue === 'all') ? true : (c.region === regionValue);

    if (matchKeyword && matchRegion) {
      filtered.push(c);
    }
  }

  renderCards(filtered);
}
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.setPlaybackRate(2); // vitesse x2
  event.target.mute();             // reste en mute
}


// Écouteurs de recherche et filtre
searchInput.addEventListener('input', applyFilters);                