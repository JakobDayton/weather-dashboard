var citySearch = document.querySelector("#search");
var searchBtnEl = document.querySelector("#search-btn");
var recentSearches = document.querySelector("#cities-list");
var cityEl = document.querySelector("#cityName");
var recentlySearched = JSON.parse(localStorage.getItem("history"));

var tempEl = document.querySelector("#temp");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var apiKey = "320b35be08bd59f2b68b6facc97753f6";

var date1 = document.querySelector("#dateDay1");
var date2 = document.querySelector("#dateDay2");
var date3 = document.querySelector("#dateDay3");
var date4 = document.querySelector("#dateDay4");
var date5 = document.querySelector("#dateDay5");

var temp1 = document.querySelector("#tempDay1");
var temp2 = document.querySelector("#tempDay2");
var temp3 = document.querySelector("#tempDay3");
var temp4 = document.querySelector("#tempDay4");
var temp5 = document.querySelector("#tempDay5");

var humidity1 = document.querySelector("#humidityDay1");
var humidity2 = document.querySelector("#humidityDay2");
var humidity3 = document.querySelector("#humidityDay3");
var humidity4 = document.querySelector("#humidityDay4");
var humidity5 = document.querySelector("#humidityDay5");

var wind1 = document.querySelector("#windDay1");
var wind2 = document.querySelector("#windDay2");
var wind3 = document.querySelector("#windDay3");
var wind4 = document.querySelector("#windDay4");
var wind5 = document.querySelector("#windDay5");

searchBtnEl.addEventListener("click", function(){
  var city = citySearch.value;

  storeHistory(city);
  getAPI(city);
})

function getAPI(cityName) {

  var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
 
  var weatherIcon = document.createElement("img");


  fetch(queryUrl)   
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityEl.textContent = data.name + moment(data.dt,"X ").format(" MM/DD/YYYY ");
      tempEl.textContent = "temp: " + data.main.temp + " F";
      weatherIcon.src = `http://api.openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      cityEl.appendChild(weatherIcon);
      humidityEl.textContent = "humidity: " + data.main.humidity;
      windEl.textContent = "wind: " + data.wind.speed + "mph";
      console.log(weatherIcon);
      forecast(data.coord.lat, data.coord.lon);
    });
}


function forecast(lat, lon){

  var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

  fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (forecastData){
    console.log(forecastData);
   for (let index = 0; index < forecastData.list.length; index += 8) {
      // var  = forcastData.list[1];
      date1.textContent = moment(forecastData.list[8].dt,"X ").format(" MM/DD/YYYY ");
      temp1.textContent = "temp: " + forecastData.list[8].main.temp + " F";
      humidity1.textContent = "humidity: " + forecastData.list[8].main.humidity;
      wind1.textContent = "wind: " + forecastData.list[8].wind.speed + "mph";

      date2.textContent = moment(forecastData.list[16].dt,"X ").format(" MM/DD/YYYY ");
      temp2.textContent = "temp: " + forecastData.list[16].main.temp + " F";
      humidity2.textContent = "humidity: " + forecastData.list[16].main.humidity;
      wind2.textContent = "wind: " + forecastData.list[16].wind.speed + "mph";

      date3.textContent = moment(forecastData.list[24].dt,"X ").format(" MM/DD/YYYY ");
      temp3.textContent = "temp: " + forecastData.list[24].main.temp + " F";
      humidity3.textContent = "humidity: " + forecastData.list[24].main.humidity;
      wind3.textContent = "wind: " + forecastData.list[24].wind.speed + "mph";

      date4.textContent = moment(forecastData.list[32].dt,"X ").format(" MM/DD/YYYY ");
      temp4.textContent = "temp: " + forecastData.list[32].main.temp + " F";
      humidity4.textContent = "humidity: " + forecastData.list[32].main.humidity;
      wind4.textContent = "wind: " + forecastData.list[32].wind.speed + "mph";

      date5.textContent = moment(forecastData.list[39].dt,"X ").format(" MM/DD/YYYY ");
      temp5.textContent = "temp: " + forecastData.list[39].main.temp + " F";
      humidity5.textContent = "humidity: " + forecastData.list[39].main.humidity;
      wind5.textContent = "wind: " + forecastData.list[39].wind.speed + "mph";
    }
  });
}

function getHistory(){
  searchHistory.innerHTML = "";
  
    for (let i = 0; i < recentlySearched.length; i++) {
      var citiesList = document.createElement("button");
      citiesList.textContent = recentlySearched[i];

      recentSearches.append(citiesList);
    }
}

function initHistory(){
  var History = localStorage.getItem("history");
  if (History) {
    searchHistory = JSON.parse(History, city);
  }
  getHistory();


}

function storeHistory(cities){
  recentlySearched.push(cities) 

  localStorage.setItem("history", JSON.stringify(recentlySearched));
}

getHistory();