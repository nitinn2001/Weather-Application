function fetchWeather(city) {
  fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=bb7d76519ca8447d86b50642231302&q=" +
      city +
      "&days=8&aqi=yes&alerts=yes"
  )
    .then((response) => response.json())
    .then((data) => {
      try {
        display(data);
      } catch (error) {
        alert("Error 404 - Please Enter an Valid Location");
      }
    });
}

function display(data) {
  const week = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  const isday = data.current.is_day;
  const code = data.current.condition.code;
  if (isday === 1) {
    document.getElementById("weathericon").src =
      "./images/Svg/day/" + code + ".svg";
    document.getElementById("cloudy").src = "./images/Svg/day/" + code + ".svg";
  } else {
    document.getElementById("weathericon").src =
      "./images/Svg/day/" + code + ".svg";
    document.getElementById("cloudy").src = "./images/Svg/day/" + code + ".svg";
  }
  document.getElementById("temp").innerHTML = data.current.temp_c;
  document.getElementById("loc").innerHTML = data.location.name;
  document.getElementById("date-time").innerHTML = moment(
    data.forecast.forecastday[0].date
  ).format("LL");
  document.getElementById("condition").innerHTML = data.current.condition.text;
  document.getElementById("rain").innerHTML =
    data.forecast.forecastday[0].day.daily_chance_of_rain;
  document.getElementById("pressure").innerHTML = data.current.pressure_in;
  document.getElementById("wind").innerHTML = data.current.wind_kph;
  document.getElementById("sunrise").innerHTML =
    data.forecast.forecastday[0].astro.sunrise;
  document.getElementById("sunset").innerHTML =
    data.forecast.forecastday[0].astro.sunset;
  document.getElementById("Humidity").innerHTML = data.current.humidity;
  document.getElementById("Visibility").innerHTML = data.current.vis_km;
  document.getElementById("airquality").innerHTML =
    data.current.air_quality.no2.toFixed(2);
  let value = "";
  data.forecast.forecastday.slice(1, 8).map((data) => {
    let d = new Date(data.date);
    value =
      value +
      `<div class="border rounded-4 shadow-sm bg-white"  style="width:10rem !important;">
        <div class="p-3" style="line-height:100%">
      <div class="card-header fw-bold text-center border border-0">${
        week[d.getDay()]
      }</div>
      <div class="card-body text-center h-30">
        <img width="60" src="./images/svg/day/${
          data.day.condition.code
        }.svg" alt="" />
      </div>
      <div class="text-center card-footer border border-0 ">
        ${data.day.maxtemp_c}<span>°</span>
        </div>
      </div>
    </div>`;
  });
  document.getElementById("card").innerHTML = value;
}

navigator.geolocation.getCurrentPosition((location) => {
  fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=bb7d76519ca8447d86b50642231302&q=" +
      location.coords.latitude +
      "," +
      location.coords.longitude +
      "&days=7&aqi=yes"
  )
    .then((res) => res.json())
    .then((data) => {
      fetchWeather(data.location.name);
    });
});
const autocomplete = (city) => {
  fetch(
    "https://api.weatherapi.com/v1/search.json?key=f7d63b9a0a45493e9cb52439231302&&q=" +
      city
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      var populate = document.getElementById("populate");
      if (data) {
        let options = data.map((location, index) => {
          return ` <div style="cursor:pointer;" onclick="optionClicked('${
            location.name
          }')" class="d-grid ${
            data.length - 1 === index ? "" : "border-bottom"
          } py-1">
                            <span class="fs-low">
                                ${location.name}
                            </span>
                            <span class="base-text"> ${location.country}</span>
                        </div>`;
        });
        if (options.length > 0) {
          populate.setAttribute(
            "class",
            populate.getAttribute("class").replace(" d-none", "")
          );
        } else {
          populate.setAttribute(
            "class",
            `${populate.getAttribute("class").replace(" d-none", "")} d-none`
          );
        }
        populate.innerHTML = options.join("\n");
      }
    });
};
const optionClicked = (location) => {
  document.getElementById("search-input").value = location;
  var populate = document.getElementById("populate");
  populate.setAttribute(
    "class",
    `${populate.getAttribute("class").replace(" d-none", "")} d-none`
  );
  fetchWeather(location);
};
const search = () => {
  document.querySelector(".search-bar").addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      fetchWeather(event.target.value);
      console.log(event.target.value);
    } else {
      autocomplete(event.target.value);
    }
  });
};
