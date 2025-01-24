import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { getWeather } from '../services/weatherService';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const data = await getWeather();
        setWeather(data);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err.message || 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    // Refresh weather data every 5 minutes
    const interval = setInterval(fetchWeather, 300000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {weather && (
        <>
          <Typography variant="h6">
            Current Weather
          </Typography>
          <Typography>
            Temperature: {weather.current?.temp}°C
          </Typography>
          <Typography>
            Feels like: {weather.current?.feels_like}°C
          </Typography>
          <Typography>
            Humidity: {weather.current?.humidity}%
          </Typography>
          {weather.current?.weather?.[0] && (
            <Typography>
              Conditions: {weather.current.weather[0].description}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Weather; 