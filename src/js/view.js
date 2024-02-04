const mainContainer = document.querySelector('.main-container');
const cityBg = document.querySelector('.current-weather');
const cityName = document.querySelector('.city-name');
const currentTemp = document.querySelector('.current-temperature');
const currentMinTemp = document.querySelector('.min-temp');
const currentMaxTemp = document.querySelector('.max-temp');
const currentFeelsLike = document.querySelector('.sensation');
const currentWindSpeed = document.querySelector('.wind-speed');
const currentConditionIcon = document.querySelector('.current-condition');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('input');

class View {
  setCityName(name) {
    cityName.textContent = name;
    return this;
  }

  setTodayInfos(
    currentTemperature,
    minCurrentTemp,
    maxCurrentTemp,
    feelsLike,
    windSpeed,
    conditionIcon,
    cityUrl
  ) {
    currentTemp.textContent = `${currentTemperature}ºC`;
    currentMinTemp.textContent = `${minCurrentTemp}`;
    currentMaxTemp.textContent = `${maxCurrentTemp}`;
    currentFeelsLike.textContent = `${feelsLike}`;
    currentWindSpeed.textContent = `${windSpeed}`;
    currentConditionIcon.src = `../src/icons/${conditionIcon}`;

    cityBg.style.backgroundImage = `url(${cityUrl})`;
    return this;
  }

  searchNewCity(handler) {
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const newCityName = searchInput.value;
        searchInput.value = '';
        handler(newCityName);
      }
    });
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const newCityName = searchInput.value;
      searchInput.value = '';
      handler(newCityName);
    });
    return this;
  }

  removeOverlay() {
    mainContainer.classList.remove('overlayed');

    return this;
  }
}

export default new View();
