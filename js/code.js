

/////////Selectores de el doom o clases//////////////

let container = document.querySelector(".container");
let searchForm = document.querySelector(".search_submit");
let searchInput = document.querySelector(".search_input");
let temperatureDegree = document.querySelector(".inputTemp_celsius");
let weatherIcon = document.querySelector(".weatherIcon");
let temperatureDescription = document.querySelector(".inputTemp_description");
let timezone = document.querySelector(".location_city");
let date = document.querySelector(".location_date");
let min = document.querySelector(".wheather_min");
let max = document.querySelector(".wheather_max");


//////////////Doom o clases//////////////













/////////////Funciones//////////////////////////////

const displayBackgroundImage = (obj) => {
    console.log(obj.list[4].dt);
    
//convertir la fecha a formato español  
    let dateSpanish = new Date(obj.list[4].dt * 1000).toLocaleString("es-ES",
     { timeStyle: "short",
      dateStyle: "long" });

date.textContent = `Fecha: ${dateSpanish}`;
    

    const  dayHour = new Date(obj.list[4].dt * 1000).getHours();
    
  //  cambio de imagen segun la hora de ek dia (desde las 6am hasta las 6pm)
    console.log(dayHour);
    if(dayHour >= 6 && dayHour <= 18){
        container.classList.remove("night");
        container.classList.add("day");
    }
    else{
        container.classList.remove("day");
        container.classList.add("night");
    }

    //cambio de imagen segun el estado del tiempo
    console.log(obj.list[4].weather[0].main);
    if(obj.list[4].weather[0].main == "Clouds"){
        container.classList.remove("rain");
        container.classList.remove("snow");
        container.classList.add("clouds");
    }
    else if(obj.list[4].weather[0].main == "Rain"){
        container.classList.remove("clouds");
        container.classList.remove("snow");
        container.classList.add("rain");
    }
    else if(obj.list[4].weather[0].main == "Snow"){
        container.classList.remove("rain");
        container.classList.remove("clouds");
        container.classList.add("snow");
    }
    else{
        container.classList.remove("rain");
        container.classList.remove("snow");
        container.classList.remove("clouds");
    }


}

const displayData = (data) => { 

console.log(data);
temperatureDegree.textContent = Math.floor(data.list[0].main.temp);
timezone.textContent = data.list[0].name;
const icon = data.list[0].weather[0].icon;
weatherIcon.innerHTML = `<img src="./media/icons/${icon}.png" alt="Icono Que representa el estado de el tiempo "></img>`;
temperatureDescription.textContent = data.list[0].weather[0].description;
min.textContent = Math.floor(data.list[0].main.temp_min);
max.textContent = Math.floor(data.list[0].main.temp_max);
}



// Esta Funcion llama a la api y obtiene un objeto que contenga los datos
// muestra los datos en pantalla

const getWeatherData = async (city) => {

    const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&type=l&units=metric&lang=sp`, {
        headers: {
            'X-RapidAPI-Key': '679b71ed93msh2b027b17e53cc38p129e6ajsn61d3ee41197e',
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
    });
    const data = await res.json();

    console.log(data);

    displayBackgroundImage(data);

     displayData(data);
}



window.onload = () => {
    getWeatherData("Santo Domingo");
}


/////////////Eventos//////////////////////////////
searchForm.addEventListener("submit", e => {
    e.preventDefault();
    getWeatherData(searchInput.value);
})











///////////// Declaraciones De Funciones//////////////////////////////

