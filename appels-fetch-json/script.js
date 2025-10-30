// script.js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => {
    console.log("Données reçues :", data);
  })
  .catch(error => {
    console.error("Erreur lors de la récupération :", error);
  });


  fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log("Status :", response.status); // ex: 200
    console.log("OK ?", response.ok);         // ex: true
    console.log("Type :", response.type);     // ex: 'cors'
    return response.json();                   // Convertit en JSON
  })
  .then(data => console.log("Données :", data));
  fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response =>{
    console.log()
  })
