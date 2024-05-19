//Today's Card Variables:                                                   داتا اول كارد عندى
let today = document.getElementById("today"),
  todayDate = document.getElementById("today-date"),
  cityLocation = document.getElementById("location"),
  todayDegree = document.getElementById("today-degree"),
  todayIcon = document.getElementById("today-icon"),
  description = document.getElementById("today-description"),
  humidty = document.getElementById("humidty"),
  wind = document.getElementById("wind"),
  compass = document.getElementById("compass"),
  searchBar = document.getElementById("search-bar");

//Next Days Variables:                           الاتنين كاردز الى بعد اليوم الاول الى لسه هعرض فيهم
let nextDay = document.getElementsByClassName("nextDay"),
  nextDayIcon = document.getElementsByClassName("nextDay-icon"),
  maxDegree = document.getElementsByClassName("max-degree"),
  minDegree = document.getElementsByClassName("min-degree"),
  nextDayDescription = document.getElementsByClassName("nextDay-description"),
  currentCity = "Cairo",
  apiResponse,
  responseData,
  monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Spet",
    "Oct",
    "Nov",
    "Dec",
  ],
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];




async function getWeatherData() {
  apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9a7f27afc5ea4fbf811175831241605&q=${currentCity}&days=3`);
  responseData = await apiResponse.json();
   console.log(responseData);
  displayTodayWeather();
  displayNextDayWeather();
  getCoordintes()
  

}

let date = new Date();
function displayTodayWeather() {
  console.log(date);
  today.innerHTML = days[date.getDay()];
  cityLocation.innerHTML = responseData.location.name;
  todayDegree.innerHTML = responseData.current.temp_c;
  todayIcon.setAttribute('src' , `https:${responseData.current.condition.icon}`);
  description.innerHTML = responseData.current.condition.text;
  humidty.innerHTML = responseData.current.humidity;
  wind.innerHTML = responseData.current.wind_kph;
  compass.innerHTML = responseData.current.wind_dir;
}

function displayNextDayWeather(){
  for (let i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()] 
    nextDayIcon[i].setAttribute("src" , `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
    maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
    minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
    nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text;
  }

}
searchBar.addEventListener("keyup", function(){
  currentCity = searchBar.value;
  console.log(currentCity);
  getWeatherData(currentCity);
})
getWeatherData();


// Step 1: Get user coordinates 
function getCoordintes() { 
	var options = { 
		enableHighAccuracy: true, 
		timeout: 5000, 
		maximumAge: 0 
	}; 

	function success(pos) { 
		var crd = pos.coords; 
		var lat = crd.latitude.toString(); 
		var lng = crd.longitude.toString(); 
		var coordinates = [lat, lng]; 
		console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
		getCity(coordinates); 
		return; 

	} 

	function error(err) { 
		console.warn(`ERROR(${err.code}): ${err.message}`); 
	} 

	navigator.geolocation.getCurrentPosition(success, error, options); 
} 

// Step 2: Get city name 
function getCity(coordinates) { 
	var xhr = new XMLHttpRequest(); 
	var lat = coordinates[0]; 
	var lng = coordinates[1]; 

	// Paste your LocationIQ token below. 
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.f98f3940c3571a0445dc43a12951203f&lat= "+
	lat + "&lon=" + lng + "&format=json", true); 
	xhr.send(); 
	xhr.onreadystatechange = processRequest; 
	xhr.addEventListener("readystatechange", processRequest, false); 

	function processRequest(e) { 
		if (xhr.readyState == 4 && xhr.status == 200) { 
			var response = JSON.parse(xhr.responseText); 
			var city = response.address.city; 
			console.log(city); 
			return; 
		} 
	} 
} 

getCoordintes(); 
