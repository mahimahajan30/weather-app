document.addEventListener('DOMContentLoaded', () => {
  const goodElement = document.getElementById("good");
  const afternoonElement = document.getElementById("afternoon");
  const greetingContainer = document.getElementById("greeting-container");

  const hour = new Date().getHours();
  let greeting = "Afternoon";
  if (hour >= 5 && hour < 12) greeting = "Morning";
  else if (hour >= 18) greeting = "Evening";

  goodElement.textContent = "Good";
  afternoonElement.textContent = greeting;

  goodElement.classList.add("show-good");
  setTimeout(() => afternoonElement.classList.add("show-afternoon"), 1000);

  setTimeout(() => {
    greetingContainer.style.opacity = "0";
    setTimeout(() => {
      greetingContainer.style.display = "none";
      document.getElementById("weather-container").style.display = "block";
    }, 1000);
  }, 5000);
});

function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city!");
    return;
  }

  const apiKey = "cc38b1a2ad87c6c848a2bf520d89ba35"; // Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
        document.getElementById("result").innerHTML = "<p class='error'>City not found!</p>";
        return;
      }

      const temp = data.main.temp;
      const description = data.weather[0].description;
      const cityName = data.name;

      // ✅ Debug output to console
      console.log("Weather description:", description);

      document.getElementById("result").innerHTML = `
        <h2>Weather in ${cityName}</h2>
        <p class="temp">${temp}°C</p>
        <p>${description}</p>
      `;
      document.getElementById("result").style.display = "block";

      showWeatherTip(description);
      changeBackgroundAnimation(description);
    })
    .catch(() => {
      document.getElementById("result").innerHTML = "<p class='error'>Error fetching data.</p>";
    });
}

function showWeatherTip(desc) {
  const tip = document.getElementById("weather-tip");
  let msg = "";

  if (desc.includes("rain")) msg = "Oops! Carry an umbrella!";
  else if (desc.includes("clear") || desc.includes("sun")) msg = "Stay hydrated and wear sunglasses!";
  else if (desc.includes("snow")) msg = "Wear warm clothes!";
  else if (desc.includes("cloud")) msg = "Cool breeze! Maybe carry a jacket.";

  tip.textContent = msg;
  tip.style.display = "block";
}

function changeBackgroundAnimation(desc) {
  const bg = document.getElementById("background-animation");
  bg.innerHTML = "";

  if (desc.includes("rain")) {
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement("div");
      drop.className = "rain";
      drop.style.left = Math.random() * 100 + "%";
      drop.style.animationDelay = Math.random() + "s";
      bg.appendChild(drop);
    }
  } else if (desc.includes("snow")) {
    for (let i = 0; i < 50; i++) {
      const flake = document.createElement("div");
      flake.className = "snow";
      flake.style.left = Math.random() * 100 + "%";
      bg.appendChild(flake);
    }
  } else if (desc.includes("clear") || desc.includes("sun")) {
    for (let i = 0; i < 20; i++) {
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.style.left = Math.random() * 100 + "%";
      bg.appendChild(flower);
    }
  }
}
