import { writable, get } from 'svelte/store';
import type { City } from '../scripts/city'
import { airPollutionStore } from './airPollution';
import { weatherStore } from './weather';

interface CityState {
  cities: City[]
  selectedCity: number
}

const createCityStore = () => {
  const initialCities= [
      {
        name: 'Santiago',
        country: 'Chile',
        latitude: -33.45694,
        longitude: -70.64827,
        imageURL: './src/assets/santiago.jpg',
        id: 0,
      },
      {
        name: 'Copenhague',
        country: 'Dinamarca',
        latitude: 55.6761,
        longitude: 12.5683,
        imageURL: 'https://media.istockphoto.com/id/901375804/es/foto/nyhavn-copenhague-dinamarca.jpg?s=612x612&w=0&k=20&c=310-UnqrE0ckXLgUl7RNeTkF_hC3bBGsqYOgUGMscvU=',
        id: 1,
      },
      {
        name: 'Londres',
        country: 'Inglaterra',
        latitude: 51.5074,
        longitude: -0.1278,
        id: 2,
        imageURL: 'https://www.visitbritain.com/sites/default/files/styles/consumer_campaigns_hero_mobile/public/consumer_components_enhanced/header_image/vb34141644.jpg?itok=9qBFm0pJ'
      },
      {
        name: 'Tokio',
        country: 'Japón',
        latitude: 35.6895,
        longitude: 139.6917,
        id: 3,
        imageURL: 'https://media.istockphoto.com/id/904453184/es/foto/horizonte-de-mt-fuji-y-tokio.jpg?s=612x612&w=0&k=20&c=lrtWbL4huTRv9P4_x9YJU2Qpgu4uguZvCjlzKs154Sc='
      },
      {
        name: 'Roma',
        country: 'Italia',
        latitude: 41.9028,
        longitude: 12.4964,
        id: 4,
        imageURL: 'https://cdn.pixabay.com/photo/2019/10/06/08/57/tiber-river-4529605_1280.jpg'
      },
    ];

  const { subscribe, set, update } = writable<CityState>({
    cities: initialCities,
    selectedCity: 0,
  });

   const fetchData = async (id) => {
      await Promise.all([
              weatherStore.fetchWeather(id),
              weatherStore.fetchWeathers(id),
              airPollutionStore.fetchAirPollution(id)
          ])

  }

  const setSelectedCity = (idx: number) => {
    update((state) => {
      state.selectedCity = idx;
      return state;
    });
  };

  const addCity = (city: City) => {
    
    update((state) => {
      state.cities = [...state.cities, city];
      state.selectedCity = state.cities.length - 1
      localStorage.setItem('cities', JSON.stringify(state.cities));
      return state;
    });
  };

  const fetchCities = async(cities) => {
        await Promise.all(cities.map(city =>
            Promise.all([
                weatherStore.fetchWeather(city.id),
                weatherStore.fetchWeathers(city.id),
                airPollutionStore.fetchAirPollution(city.id)
            ])
        ));
  }

  const setCities = (cities: City[]) => {
    update((state) => {
      state.cities = cities;
      return state;
    });
  };

  return {
    subscribe,
    createCityStore,
    setSelectedCity,
    addCity,
    setCities,
    fetchCities,
    fetchData
  };
}

export const cityStore = createCityStore();