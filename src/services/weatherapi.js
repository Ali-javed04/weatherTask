import axios from 'axios';

const fetchWeatherData = async (city) => {
  const apiKey = '4882c55f8e9a132f8424e48f95c7abec';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export default fetchWeatherData;
