document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("citiesContainer");
  const searchInput = document.getElementById("searchInput");
  const regionSelect = document.getElementById("regionSelect");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");

  let cities = [];

  // Charger le JSON
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      cities = data.cities;
      afficherVilles(cities);
    });

  // Afficher toutes les villes
  function afficherVilles(list) {
    container.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
      const city = list[i];
      const card = document.createElement("div");
      card.className = "city-card";
      card.style.backgroundImage = "url('" + city.images[0] + "')";
      
      const info = document.createElement("div");
      info.className = "city-info";

      const title = document.createElement("h3");
      title.textContent = city.name;

      const desc = document.createElement("p");
      desc.textContent = city.description.substring(0, 80) + "...";

      const btn = document.createElement("button");
      btn.textContent = "Voir plus";
      btn.addEventListener("click", function() {
        ouvrirModal(city);
      });

      info.appendChild(title);
      info.appendChild(desc);
      info.appendChild(btn);
      card.appendChild(info);
      container.appendChild(card);
    }
  }

  // Recherche
  searchInput.addEventListener("input", function() {
    const val = this.value.toLowerCase();
    const resultat = [];
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].name.toLowerCase().includes(val)) {
        resultat.push(cities[i]);
      }
    }
    afficherVilles(resultat);
  });

  // Filtre par région
  regionSelect.addEventListener("change", function() {
    const region = this.value;
    const resultat = [];
    for (let i = 0; i < cities.length; i++) {
      if (region === "all" || cities[i].region === region) {
        resultat.push(cities[i]);
      }
    }
    afficherVilles(resultat);
  });

  // Ouvrir la fenêtre modale
  function ouvrirModal(city) {
    document.getElementById("modalTitle").textContent = city.name;
    document.getElementById("modalDescription").textContent = city.description;
    document.getElementById("modalLandmarks").textContent = city.landmarks;
    document.getElementById("modalHistory").innerHTML = "<a href='" + city.map + "' target='_blank'>Voir sur la carte</a>";
    document.getElementById("modalPopularity").textContent = city.popularity;
    document.getElementById("modalMore").href = city.wikipedia;

    const imgs = document.getElementById("modalImages");
    imgs.innerHTML = "";
    for (let i = 1; i < city.images.length; i++) {
      const img = document.createElement("img");
      img.src = city.images[i];
      imgs.appendChild(img);
    }

    modal.style.display = "block";
  }

  // Fermer le modal
  closeModal.addEventListener("click", function() {
    modal.style.display = "none";
  });

  window.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

