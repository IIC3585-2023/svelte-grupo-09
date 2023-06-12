import { writable, derived, get } from 'svelte/store';
import { cityStore } from './city';
import { weatherStore } from './weather';
import { airPollutionStore } from "./airPollution";

import type { City } from '../scripts/city';

interface ConnectorStore {
  subscribe: (subscription: (value: any) => void) => () => void;
}

const createConnectorStore = (): ConnectorStore => {
    const { subscribe, set } = writable({
        status: 'loading',
        todayWeatherForThisCity: undefined,
        todayForeCastForThisCity: undefined,
        todayWeatherForAllCities: undefined,
        todayPollutionForThisCity: undefined,
        todayPollutionForAllCities: undefined
    });

    let cities = get(cityStore).cities;
    cityStore.fetchCities(cities).then(() => {

        cityStore.subscribe(async $cityStore => {
            if ($cityStore) {
                let selectedCity: City = $cityStore.cities[$cityStore.selectedCity];
                let cities: City[] = $cityStore.cities;



                const todayWeatherForThisCity = get(weatherStore).citiesWeather[selectedCity.id]?.weather;
                const todayPollutionForThisCity = get(airPollutionStore).citiesPollution[selectedCity.id]?.airPollution;
                const todayForeCastForThisCity = get(weatherStore).citiesWeather[selectedCity.id]?.weathers;
                const todayWeatherForAllCities = cities.map(city => get(weatherStore).citiesWeather[city.id]?.weather);
                const todayPollutionForAllCities = cities.map(city => get(airPollutionStore).citiesPollution[city.id]?.airPollution);
                
                set({
                    status: 'loaded',
                    todayWeatherForThisCity,
                    todayForeCastForThisCity,
                    todayWeatherForAllCities,
                    todayPollutionForThisCity,
                    todayPollutionForAllCities
                });
            }
        });
    });

    return {
        subscribe,
    };
};

export const storeConnector = createConnectorStore();
