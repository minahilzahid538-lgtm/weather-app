const apiKey = "e8caeb3a36324bef0672b56a4311b553";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

searchBtn.addEventListener("click", () => {

    getWeather(cityInput.value);

});

cityInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){
        getWeather(cityInput.value);
    }

});

locationBtn.addEventListener("click", () => {

    navigator.geolocation.getCurrentPosition(position => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeatherByCoords(lat, lon);

    });

});

async function getWeather(city){

    if(city === ""){
        alert("Please enter city name");
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetchWeather(url);

}

async function getWeatherByCoords(lat, lon){

    const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetchWeather(url);

}

async function fetchWeather(url){

    try{

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        if(data.cod == "404"){
            alert("City not found");
            return;
        }

        if(data.cod == 401){
            alert("Invalid API Key");
            return;
        }

        document.getElementById("temperature").innerHTML =
        `${Math.round(data.main.temp)}°C`;

        document.getElementById("cityName").innerHTML =
        data.name;

        document.getElementById("description").innerHTML =
        data.weather[0].description;

        document.getElementById("humidity").innerHTML =
        `${data.main.humidity}%`;

        document.getElementById("wind").innerHTML =
        `${data.wind.speed} km/h`;

        const iconCode = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    }

    catch(error){

        console.log(error);

        alert("Error fetching weather data");

    }

}