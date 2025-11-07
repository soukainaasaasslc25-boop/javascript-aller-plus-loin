let produits = [
  { nom: "PC portable", prix: 900 },
  { nom: "Souris", prix: 25 },
  { nom: "Clavier", prix: 40 },
  { nom: "Écran", prix: 150 }
];

let liste = document.getElementById("produits");

// Filtrer les produits à moins de 100€
let produitsFiltres = produits.filter(p => p.prix < 100);

// Si aucun produit ne correspond, afficher un message
if (produitsFiltres.length === 0) {
  liste.innerHTML = "<li>Aucun produit en promotion.</li>";
} else {
  produitsFiltres.forEach(p => {
    let li = document.createElement("li");
    li.textContent = `${p.nom} – ${p.prix} €`;
    liste.appendChild(li);
  });
}
let ligne=document.getElementById("ligne");


let products= [
  { nom: "PC ", prix: 900 },
  { nom: "Sou", prix: 25 },
  { nom: "Cla", prix: 40 },
  { nom: "Éc", prix: 150 }
];

let lista=document.getElementById("produits");
ligne.innerHTML="<h1> nouvelle liste pour les produit le plus dun 100$</h1> ";
lista.appendChild(ligne);
let productsfilters=products.filter(p=>p.prix <1000);

if (products.length>0) {

   productsfilters.forEach(p=>{
    let li=document.createElement("li");
    li.textContent=`${p.nom}---${p.prix} $`;
    lista.appendChild(li);
  })
}else{
  lista.innerHTML="<li> acun prpduit trouver </li>"
}
