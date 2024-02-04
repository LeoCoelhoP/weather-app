const REVERSE_GEOCODE_API_KEY = '[YOUR-KEY]';
const REVERSE_GEOCODE_API_URL = 'https://geocode.maps.co/reverse?';

const WEATHER_API_KEY = '[YOUR-KEY]';
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/forecast.json?key=';

export const state = {};

export const getCityInfos = async (name) => {
  let response;
  if (name) {
    response = await fetch(
      `${WEATHER_API_URL}${WEATHER_API_KEY}&q=${name}&days=4`
    );
  } else {
    response = await fetch(
      `${WEATHER_API_URL}${WEATHER_API_KEY}&q=${state.latitude},${state.longitude}&days=4`
    );
  }

  const variablesGetter = (forecast) => {
    const conditions = [];
    for (let i = 0; i < 4; i += 1) {
      const [, month, day] = forecast.forecastday[i].date.split('-', 3);
      const maxTemp = Math.round(forecast.forecastday[i].day.maxtemp_c);
      const minTemp = Math.round(forecast.forecastday[i].day.mintemp_c);
      const condition = forecast.forecastday[i].day.condition.code;
      conditions.push([maxTemp, minTemp, condition, month, day]);
      console.log(conditions);
    }
    return conditions;
  };

  const data = await response.json();
  const { forecast } = data;
  const [today, tomorrow, dayAfterTomorrow, thirdDayFromToday] =
    variablesGetter(forecast);

  state.today = {
    maxTemp: today[0],
    minTemp: today[1],
    condition: today[2],
    feelsLike: Math.round(data.current.feelslike_c),
    windSpeed: data.current.wind_kph,
    windVelocity: data.current.wind_kph,
    currentTemp: data.current.temp_c,
  };
  state.tomorrow = {
    maxTemp: tomorrow[0],
    minTemp: tomorrow[1],
    condition: tomorrow[2],
    month: tomorrow[3],
    day: tomorrow[4],
  };
  state.dayAfterTomorrow = {
    maxTemp: dayAfterTomorrow[0],
    minTemp: dayAfterTomorrow[1],
    condition: dayAfterTomorrow[2],
    month: dayAfterTomorrow[3],
    day: dayAfterTomorrow[4],
  };
  state.thirdDayFromToday = {
    maxTemp: thirdDayFromToday[0],
    minTemp: thirdDayFromToday[1],
    condition: thirdDayFromToday[2],
    month: thirdDayFromToday[3],
    day: thirdDayFromToday[4],
  };
};
export const getCityImage = async (cityName) => {
  const imageResponse = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=[YOUR-KEY]&q=${cityName}-cidade&searchType=image`
  );
  const data = await imageResponse.json();
  state.cityImageUrl = data.items[1].link;
  return new Promise((resolve) => {
    resolve();
  });
};
export const getCityName = async (cityName) => {
  if (cityName) {
    state.cityName = cityName;
    await getCityImage(cityName);
    return new Promise((resolve) => {
      resolve(cityName);
    });
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      state.latitude = position.coords.latitude;
      state.longitude = position.coords.longitude;

      const response = await fetch(
        `${REVERSE_GEOCODE_API_URL}lat=${state.latitude}&lon=${state.longitude}&api_key=${REVERSE_GEOCODE_API_KEY}`
      );

      const data = await response.json();

      state.cityName = data.address.town;
      state.country = data.address.country;
      await getCityImage(state.cityName);
      resolve();
    });
  });
};
