// Setting up variables
let cityInput = document.getElementById('city');
let infoDiv = document.getElementById('info');
let infoDiv2 = document.getElementById('info2');

// API variables
const searchButton = document.getElementById('search');
const key = '8f9ed17c9f13a02c8bfa2f65a580eb72';
const imgUrl = 'http://openweathermap.org/img/wn';

// Show data in the div
let info_city = document.getElementById("info_city");
let info_country = document.getElementById("info_country");
let info_current_weather = document.getElementById("info_current_weather");
let info_lat;
let info_lon;
let table_day;
let table_temp_min;
let table_temp_max;
let table_weather;

// add Action on the button
searchButton.addEventListener('click', (event) => {
  cityInput = document.getElementById('city').value;
  if (cityInput.length == 0) {
    alert('Please insert a city name');
  } else {

    weatherRequest()
  }
});

// Quick Fetch function
function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
}

// First Fetch by city inout
function weatherRequest() {

  fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}`)

    .then(data => basicData(data))
    .catch(notFound)
}
// Display all in web
function basicData(data) {
  info_city.textContent = `City: ${data.name}`;
  info_country.textContent = `Country: ${data.sys.country}`;
  info_current_weather.textContent = `Current weather: ${data.weather[0].description}`;
  info_lat = data.coord.lat;
  info_lon = data.coord.lon;
  weatherRequestForecast();
}
// Second Fetch with longtitude and latitude from Fetch#1
async function weatherRequestForecast() {
  await fetchData(`https://api.openweathermap.org/data/2.5/onecall?lat=${info_lat}&lon=${info_lon}&exclude={part}&units=metric&appid=${key}`)


    .then(data => tableData(data))
}
//  Displaying data in web
function tableData(data) {
  table_object = data.daily.map(
    (item, i) =>
      `<tr>
      <td>${i}</td>
      <td>${item.temp.min}</td>
      <td>${item.temp.max}</td>
      <td> <img src="${imgUrl}/${item.weather[0].icon}@2x.png"
      title ="${item.weather[0].description}"></th>
    </tr>`
  )
  // Create table 
  const table = `
  <table class="table bg-dark text-white">
  <thead><h2> 7 day Forecast<h2></thead>
  <tbody>
  <th>Day</th>
  <th>Temp min</th>
  <th>Temp max</th>
  <th>Weather</th>
    ${table_object.join("")}
    </tbody>
  </table>`

  infoDiv2.innerHTML = table;
}

// Catch error
function notFound(error) {
  var info = document.getElementById('info');
  // console.log(err);
  var newHTML = `<h1>City not found</h1> <p>${error}</p>`;
  info.innerHTML = newHTML;
  weatherRequest();
}
// thank you Elizabeth