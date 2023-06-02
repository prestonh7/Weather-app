async function getWeather(location) {
    try {
        const request = await fetch('http://api.weatherapi.com/v1/forecast.json?key=&q=' + location + '&days=7&aqi=no&alerts=no');
        const weatherData = await request.json();
        const weatherArray = weatherData.forecast.forecastday;
        console.log(weatherArray);
        return weatherArray;
    }
    catch(err) {
        console.log("Error: " + err);
    }
}

async function drawWeather(weatherData) {
    try {
        const weatherArray = await weatherData;

        weatherArray.forEach(item => {
            const icon = item.day.condition.icon;
            const date = item.date;
            const avgTemp = item.day.avgtemp_f;
            const minTemp = item.day.mintemp_f;
            const maxTemp = item.day.maxtemp_f;

            createWeatherCard(icon, date, avgTemp, minTemp, maxTemp);
        });
    }
    catch(err) {
        console.log('Error: ' + err);
    }
}

function createWeatherCard(icon, date, avgTemp, minTemp, maxTemp) {
    const content = document.getElementById('content');
    const div = document.createElement('div');
    const image = document.createElement('img');
    const dateText = document.createElement('p');
    const avg = document.createElement('p');
    const range = document.createElement('p');

    image.src = `https:${icon}`;
    dateText.innerText = `${date}`;
    avg.innerText = `${avgTemp}`
    range.innerText = `${minTemp} - ${maxTemp}`;

    div.appendChild(dateText);
    div.appendChild(image);
    div.appendChild(avg);
    div.appendChild(range);
    content.appendChild(div);
}

drawWeather(getWeather('houston'));
