async function getWeather(location) {
    try {
        const request = await fetch('http://api.weatherapi.com/v1/forecast.json?key=6bc1f1ea845c4991a09232222232905&q=' + location + '&days=7&aqi=no&alerts=no');
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
            const date = item.date;
            const avgTemp = item.day.avgtemp_f;
            const minTemp = item.day.mintemp_f;
            const maxTemp = item.day.maxtemp_f;
            const maxWind = item.day.maxwind_mph;

            const dataString = `Date: ${date}, Avg Temp: ${avgTemp}°F, Min Temp: ${minTemp}°F, Max Temp: ${maxTemp}°F Max Wind speed: ${maxWind} mph`;
            const paragraph = document.createElement('p');
            paragraph.textContent = dataString;
            const content = document.getElementById('content');
            content.appendChild(paragraph);
        });
    }
    catch(err) {
        console.log('Error: ' + err);
    }
}

drawWeather(getWeather('houston'));
