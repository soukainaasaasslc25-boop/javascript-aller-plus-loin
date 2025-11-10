
const MeteoApi=[
    {
        key:"4eb3703790b356562054106543b748b2",
        baseUrl:"https://api.openweathermap.org/data/2.5/weather"

    }
];


const inputVille=document.getElementById("ID-inputVille");
const btnRechercher=document.getElementById("Id-button");
const donneesMeteo=document.getElementById("Id-donnee-Meteo");



btnRechercher.addEventListener("click",function (event) {
    event.preventDefault();
    let nomVille=inputVille.value;
  if (nomVille.trim()!=="") {
     let url=MeteoApi[0].baseUrl+"?q="+nomVille+"&appid="+MeteoApi[0].key+"&units=metric&lang=fr";
    fetch(url)
    .then(reponse=>reponse.json())
    .then(data=>{
        console.log("city",data);
      const nom=document.createElement("h3");
      nom.textContent=" ville :" +nomVille;
      const temperature=document.createElement("p");
      temperature.textContent=" temperatue :" +data.main.temp_max;  
       const humidity=document.createElement("p");
      humidity.textContent=" humidity :" +data.main.humidity; 

      const desciption=document.createElement("p");
      desciption.textContent=" description :" +data.weather[0].description; 

    //   senset time
let sunset = data.sys.sunset; // timestamp en secondes

let secondes = sunset % 86400;           // secondes depuis minuit UTC
let heuresUTC = Math.floor(secondes / 3600);
let minutes = Math.floor((secondes % 3600) / 60);

let heuresMaroc = (heuresUTC + 1) % 24;  // Maroc = UTC+1

let periode = heuresMaroc >= 12 ? "PM" : "AM";
let heures12 = heuresMaroc > 12 ? heuresMaroc - 12 : (heuresMaroc === 0 ? 12 : heuresMaroc);
let minutes2 = minutes < 10 ? "0" + minutes : minutes;

let p = document.createElement("p");
p.textContent = `Coucher du soleil : ${heures12}:${minutes2} ${periode}`;

       
       const img=document.createElement("img");
       img.src="https://openweathermap.org/img/wn/"+data.weather[0].icon+"@4x.png";
      donneesMeteo.appendChild(nom);
      donneesMeteo.appendChild(temperature);
      donneesMeteo.appendChild(desciption);
        donneesMeteo.appendChild(humidity);
      humidity.style.color="pink";
    donneesMeteo.appendChild(p);
      donneesMeteo.appendChild(img);
    
    })
    .catch(error=>{

        console.log("erroooooooooooooor",error);
    })
  }
  else{
    const error=document.createElement("p");
    error.textContent="enter le nome d abord";
    donneesMeteo.innerHTML="";
    donneesMeteo.appendChild(error);
  }
});