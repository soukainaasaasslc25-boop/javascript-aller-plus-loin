
let container = document.getElementById("articles");

fetch('https://jsonplaceholder.typicode.com/posts?_limit=2')
  .then(response => response.json())
  .then(posts => {
    let section = document.createElement('section');

    posts.forEach(post => {
      let article = document.createElement('article');
      article.textContent =`id====${post.id}----------------------------title====${post.title}------------------------------------------body====${post.body}`;
      section.appendChild(article);
    });

    container.appendChild(section);
  })
  .catch(error => {
    container.innerText = "Erreur lors de la récupération des données.";
    console.error(error);
  });


//  const myjsoninformation = `{"username": "soukaina", "age": "19ans", "hell": "haay"}`;

// // Affichage du JSON brut
// console.log(typeof myjsoninformation); // string
// console.log(myjsoninformation);

// // 2. Convertir le JSON en objet JavaScript
// let myobj = JSON.parse(myjsoninformation);
// console.log(typeof myobj.age); // object
// console.log(myobj);

// // 3. Sauvegarder dans localStorage
// localStorage.setItem('userInfo', JSON.stringify(myobj));
// console.log("Données sauvegardées dans localStorage !");

// // 4. Récupérer plus tard (ex: après rechargement)
// let savedData = localStorage.getItem('userInfo');
// if (savedData) {
//     let retrievedObj = JSON.parse(savedData);
//     console.log("Données récupérées :", retrievedObj);
//     console.log("Nom d'utilisateur :", retrievedObj.username);
// } else {
//     console.log("Aucune donnée trouvée dans localStorage.");
// }


let useID = document.getElementById("users");

// Clé pour localStorage
const STORAGE_KEY = "users_data";

// Vérifier si les données sont déjà dans localStorage
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  // Charger depuis localStorage
  const users = JSON.parse(savedData);
  afficherUsers(users);
} else {
  // Sinon, charger depuis l'API
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
      // Sauvegarder dans localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      afficherUsers(users);
    });
}

// Fonction pour afficher
function afficherUsers(users) {
  let ul = document.createElement("ul");
  users.forEach(user => {
    let li = document.createElement("li");
    li.textContent = `${user.id} - ${user.name} (${user.email})`; // Corrigé : user.id, pas user.useID
    ul.appendChild(li);
  });
  useID.appendChild(ul);
}

// stringify => Converts a javascript value to a javascript object notation (JSON)

// to understand AJAX , Fetch , promes 
// Asynchronous Vs Synchrounous programing
// Synchrounous = must be the laste operation gomplitly to start the Synchrounous function operations
//  Asynchronous = operations start inparallel ,
