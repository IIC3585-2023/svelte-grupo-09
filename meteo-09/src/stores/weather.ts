import { writable } from 'svelte/store';
import { DateTime } from 'luxon'
import type { Weather } from '../scripts/weather'
import type { PeriodTemp } from '../scripts/constants';
import { periodsTemp } from '../scripts/constants';

interface WeatherState {
  weather: Weather
  weathers: Weather[],
  daily_weathers: Weather[][],
  selectedPeriod: PeriodTemp
}

const createWeatherStore = () => {
  const { subscribe, set, update } = writable<WeatherState>({
    weather: {
      dt: '',
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      type_weather: ''
    },
    weathers: [],
    daily_weathers: [],
    selectedPeriod: 'Hoy',
  });

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=es`);
      const data = await response.json();
      const weather: Weather = {
        dt: DateTime.fromSeconds(data.dt).toLocal().toFormat('ff') || '',
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        type_weather: data.weather[0].main,
      };
      update((state) => {
        state.weather = weather;
        return state;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeathers = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=es`);
      const data = await response.json();
      const weathers = data.list.map((weather: any) => ({
        dt: DateTime.fromSeconds(weather.dt).toLocal().toFormat('ff') || '',
        temp: weather.main.temp,
        feels_like: weather.main.feels_like,
        temp_min: weather.main.temp_min,
        temp_max: weather.main.temp_max,
        pressure: weather.main.pressure,
        humidity: weather.main.humidity,
        type_weather: weather.weather[0].main
      }));
      update((state) => {
        state.weathers = weathers;
        return state;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setSelectedPeriod = (period: PeriodTemp) => {
    update((state) => {
      state.selectedPeriod = period;
      return state;
    });
  };

  const updateWeather = (weather: Weather) => {
    update((state) => {
      state.weather = weather;
      return state;
    });
  };

  const updateWeathers = (weathers: Weather[]) => {
    update((state) => {
      state.weathers = weathers;
      return state;
    });
  };

  const filteredWeathers = (state: WeatherState): Weather[][] => {
    switch (state.selectedPeriod) {
      case periodsTemp[0]: // Hoy
        const todayWeathers = state.weathers.filter(weather =>
          DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal(), 'day')
        );
        
        return [[state.weather, ...todayWeathers]]
      case periodsTemp[1]: // Mañana
        const tomorrowWeathers = state.weathers.filter(weather =>
          DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal().plus({ days: 1 }), 'day')
        );
        
        return [tomorrowWeathers]
      case periodsTemp[2]: // Próximos 5 días
        
      const results = [];
      for (let i = 1; i <= 5; i++) {
        const daily = state.weathers.filter(weather =>
          DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal().plus({ days: i }), 'day')
        );
        results.push(daily);
      }
      return results;
    }
  };

  return {
    subscribe,
    fetchWeather,
    fetchWeathers,
    setSelectedPeriod,
    updateWeather,
    updateWeathers,
    filteredWeathers
  };
}

export const weatherStore = createWeatherStore();