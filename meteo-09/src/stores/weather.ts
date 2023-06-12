import { writable } from 'svelte/store';
import { DateTime } from 'luxon'
import type { Weather } from '../scripts/weather'
import { cityStore } from './city';



interface CityWeather {
  weather: Weather; // clima actual. es mas detallado
  weathers: Weather[]; // lista de todos los climas
  dailyWeathers: Weather[][]; // lista separada por dias
}


interface WeatherState {
  citiesWeather: { [key: number]: CityWeather };
}


const createWeatherStore = () => {
  const { subscribe, set, update } = writable<WeatherState>({
    citiesWeather: {},
  });  
  const fetchWeather = async (cityId: number) => {
    try {
      let city;
      cityStore.subscribe((state) => {
        city = state.cities[cityId]
      });
      
      const latitude = city.latitude;
      const longitude = city.latitude;

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
        const cityWeather = state.citiesWeather[cityId];
        if (!cityWeather) {
          state.citiesWeather[cityId] = {
            weather,
            weathers: [],
            dailyWeathers: [],
          };
        } else {
          cityWeather.weather = weather;
        }
        return state;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeathers = async (cityId: number) => {
    try {
      let city;
      cityStore.subscribe((state) => {
        city = state.cities[cityId]
      });
      
      const latitude = city.latitude;
      const longitude = city.latitude;

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
          state.citiesWeather[cityId].weathers=weathers
          return state;
        });
    } catch (error) {
      console.error(error);
    }
  };

  
  const filterTodayWeather = (weathers: Weather[]): Weather[] => {
        return weathers.filter((weather) =>
          DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal(), 'day')
        );
    }
    const filterNextDaysWeathers = (weathers: Weather[]): Weather[][] => {
      let result: Weather[][] = [];  
      for(let i=0; i<6; i++){
        let total = (weathers.filter((weather) =>
          DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal().plus({ days: i }), 'day')
        ));
        result.push(total);
      }
      console.log(result)
      return result;
     
    }

  return {
    subscribe,
    fetchWeather,
    fetchWeathers,
    filterTodayWeather,
    filterNextDaysWeathers
  };
}
export const weatherStore = createWeatherStore();