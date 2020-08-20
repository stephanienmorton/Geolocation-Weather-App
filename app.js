var script = document.createElement('script'); 

script.src = '//code.jquery.com/jquery-1.11.0.min.js'; 
document.getElementsByTagName('head')[0].appendChild(script);  

function getWeather() {
	let temperature = document.getElementById('temperature');
	let descr = document.getElementById('description');
	let loc = document.getElementById('location');
  let feels = document.getElementById("feels"); 
  let icon = document.getElementById("icon"); 
  let city = document.getElementById("city"); 
  let condition = document.getElementById("condition"); 
  
  //let feels = document.getElementById('feels').style.color= “#eee”;

	let api = 'https://api.openweathermap.org/data/2.5/weather';
	let apiKey = '02f684d48f7b815dafc93304933bd659';

  let icon_url = "http://openweathermap.org/img/wn/"; 

	loc.innerHTML = 'Locating....';
  
	//requests user's location.
	navigator.geolocation.getCurrentPosition(success, error);
  
	function success(position) {
		lat = position.coords.latitude;
		long = position.coords.longitude;


		let url =
			api +
			'?lat=' +
			lat +
			'&lon=' +
			long +
			'&appid=' +
			apiKey +
			'&units=imperial';

      console.log(url) 
      

	fetch(url)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

        icon.innerHTML = ("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");
        $('#display').html( icon.innerHTML );

        // icon.innerHTML = $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
				let temp = data.main.temp;
				temperature.innerHTML = temp + '° F';
        
        feels.innerHTML = "Feels like: " + data.main.feels_like;
         
        city.innerHTML = "Local Weather: " + data.name;

				loc.innerHTML =
					' (' + lat + '°, ' + long + '°)';

        
				descr.innerHTML = "Humidity: " + data.main.humidity + "%, Wind Speed: " + data.wind.speed + "m/s, Cloudiness: " + data.clouds.all + "%"; 

        condition.innerHTML = data.weather[0].description;


        

        // var iconCode = data.weather[0].icon;
        // var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        // icon.innerHTML = $(".icon").html("<img src='" + iconUrl  + "'>");
        // console.log(JSON.stringify(icon.innerHTML));
        temperature.style.color = '#34dbeb';
        loc.style.fontWeight = 'bold';
        loc.style.color = '#3471eb';
        feels.style.color = "#ccc";
        descr.style.fontStyle = "italic";
        descr.style.color = "#3471eb";
        condition.style.color = "#3471eb";
        
			});

        // var iconcode = a.weather[0].icon;
        // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        // $('#wicon').attr('src', iconurl);


	}

	function error() {
		loc.innerHTML = 'Unable to retrieve your location';
	}
}

function moveClouds(){
 /* clouds 1 & 2 move to the left 
    clouds 3 & 4 to the right */
  for(i = 1; i < 5; i++){
    var cloud = 
    document.getElementById("cloud" + i);
    cloud.style.transitionTimingFunction = "ease-out";
    cloud.style.transitionDuration = "700ms";
    var top =  window.getComputedStyle(cloud, null).getPropertyValue("top");
    
      topValue = parseInt(top);
      topValue = topValue - 20;
      top = topValue + "px";
   
    cloud.style.top = top;
    
    var left = window.getComputedStyle(cloud, null).getPropertyValue("left");
      leftValue = parseInt(left);
    
      if(i < 3){
        leftValue = leftValue - 30;
      }else {
        leftValue = leftValue + 30;
      }
      left = leftValue + "px";
    
    cloud.style.left = left;
   
  }
}

getWeather();
