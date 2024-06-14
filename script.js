document.addEventListener('DOMContentLoaded', function() {
    const citySearchForm = document.getElementById('citySearchForm');
    const weatherForm = document.getElementById('weatherForm');
    const citySelect = document.getElementById('citySelect');
    const weatherResult = document.getElementById('weatherResult');

    citySearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const citySearch = document.getElementById('citySearch').value.trim();

        if (!citySearch) {
            alert('Please enter a city name to search.');
            return;
        }

        fetch('searchCities.php?city=' + encodeURIComponent(citySearch))
            .then(response => response.json())
            .then(cities => {
                citySelect.innerHTML = '<option value="">Select city</option>';
                if (Array.isArray(cities) && cities.length > 0) {
                    cities.forEach(city => {
                        const option = document.createElement('option');
                        option.value = city.name;
                        option.textContent = `${city.name}, ${city.country}`;
                        citySelect.appendChild(option);
                    });
                } else {
                    alert('No cities found. Please try a different search.');
                }
            })
            .catch(error => {
                console.error('Error fetching city data:', error);
                alert('Error fetching city data. Please try again.');
            });
    });

    weatherForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const city = citySelect.value;

        if (!city) {
            alert('Please select a city.');
            return;
        }

        fetch('weather.php?city=' + encodeURIComponent(city))
            .then(response => response.json())
            .then(data => {
                let output = '';
                if (data.location) {
                    output = `
                        <h2>Weather in ${data.location.name}</h2>
                        <p>${data.current.condition.text}</p>
                        <p>Temperature: ${data.current.temp_c} &deg;C</p>
                        <p>Humidity: ${data.current.humidity}%</p>
                        <p>Wind: ${data.current.wind_kph} kph</p>
                    `;
                } else if (data.error) {
                    output = `<p>Error: ${data.error}</p>`;
                } else {
                    output = `<p>City not found. Please try again.</p>`;
                }
                weatherResult.innerHTML = output;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherResult.innerHTML = '<p>Error retrieving weather data. Please try again.</p>';
            });
    });
});
