const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; // Use the API key from environment variables
const BASE_URL = 'https://api.openweathermap.org/data/3.0';

export const getWeather = async (lat = 33.44, lon = -94.04) => {
  if (!API_KEY) {
    console.error('OpenWeather API key is missing in environment variables');
    throw new Error('OpenWeather API key is not configured');
  }

  try {
    const url = `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=metric&appid=${API_KEY}`;
    
    console.log('Fetching weather data from:', url); // Debug log
    
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response:', errorText);
      throw new Error(`Weather data fetch failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Weather data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}; 