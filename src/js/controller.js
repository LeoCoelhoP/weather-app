import '../css/style.css';
import '../css/mainContainer.css';
import '../css/secondaryContainer.css';
import '../css/tertiaryContainer.css';
import { getCityName, getCityInfos, state } from './model';
import view from './view';
// eslint-disable-next-line import/extensions
import nextDaysViews from './nextDaysViews';

const conditionController = (condition) => {
  if (condition === 1000) return 'sun.svg';
  if (condition === 1063) return 'sun-cloud.svg';
  if (condition === 1003) return 'sun-cloud.svg';
  if (condition === 1006) return 'cloud.svg';
  return 'rain.svg';
};

const setTodayInfo = async () => {
  const conditionIcon = conditionController(state.today.condition);
  view.setCityName(state.cityName);
  view.setTodayInfos(
    state.today.currentTemp,
    state.today.minTemp,
    state.today.maxTemp,
    state.today.feelsLike,
    state.today.windSpeed,
    conditionIcon,
    state.cityImageUrl
  );
};

const setNextDaysInfo = async () => {
  const tomorrowCondition = conditionController(state.tomorrow.condition);
  const dayAfterTomorrowCondition = conditionController(
    state.dayAfterTomorrow.condition
  );
  const thirdDayFromTodayCondition = conditionController(
    state.thirdDayFromToday.condition
  );

  nextDaysViews.setNextDaysInfos([
    [{ ...state.tomorrow }, tomorrowCondition],
    [{ ...state.dayAfterTomorrow }, dayAfterTomorrowCondition],
    [{ ...state.thirdDayFromToday }, thirdDayFromTodayCondition],
  ]);
};

const overlayController = () => {
  view.removeOverlay();
};

const getInfosController = async (city) => {
  if (city) {
    const cityName = await getCityName(city);
    const response = await cityName;
    await getCityInfos(response);
  } else {
    await getCityName();
    await getCityInfos();
  }

  setTodayInfo();
  setNextDaysInfo();
  overlayController();
};

getInfosController();
view.searchNewCity(getInfosController);
