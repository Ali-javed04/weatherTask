import axios from 'axios';
import apiKeys from "./apiKeys";

const fetchDayWeatherData = async (city,unitConveration,query) => {
 
  try {
    const response = await axios.get(
      `${apiKeys.base}weather?q=${
        city != "[object Object]" ? city : query
      }&units=${unitConveration}&APPID=${apiKeys.key}`
    )
    return response;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export default fetchDayWeatherData;
