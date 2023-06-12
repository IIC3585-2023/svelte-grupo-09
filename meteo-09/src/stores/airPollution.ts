import { writable } from 'svelte/store';
import { DateTime } from 'luxon';
import type { AirPollution } from '../scripts/airPollution'
import type { PeriodPol } from '../scripts/constants'
import { periodsPol } from '../scripts/constants'
import { cityStore } from './city';

interface CityPollution {
  airPollution: AirPollution;
  airPollutions: AirPollution[];
}

interface AirPollutionState {
   citiesPollution: { [key: number]: CityPollution };
}

const createAirPollutionStore = () => {
  const { subscribe, set, update } = writable<AirPollutionState>({
    citiesPollution: {},
  });

  const fetchAirPollution = async (cityId: number) => {
    try {
      let city;
      cityStore.subscribe((state) => {
        city = state.cities[cityId]
      });
      const latitude = city.latitude;
      const longitude = city.latitude;
      
      const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`);
      const data = await response.json();
      const body = data.list[0];
      const airPollution: AirPollution = {
        dt: DateTime.fromSeconds(body.dt).toLocal().toFormat('ff') || '',
        aqi: body.main.aqi,
        co: body.components.co,
        no: body.components.no,
        no2: body.components.no2,
        o3: body.components.o3,
        so2: body.components.so2,
        pm2_5: body.components.pm2_5,
        pm10: body.components.pm10,
        nh3: body.components.nh3
      };
      update((state) => {
        const cityPollution = state.citiesPollution[cityId];
        if (!cityPollution) {
          state.citiesPollution[cityId] = {
            airPollution,
            airPollutions: [],
          };
        } else {
          cityPollution.airPollution = airPollution;
        }
        return state
      });
    } catch (error) {
      console.error(error);
    }
  };

  /* const fetchAirPollutions = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`);
      const data = await response.json();
      const airPollutions = data.list.map((airPollution: any) => ({
        dt: DateTime.fromSeconds(airPollution.dt).toLocal().toFormat('ff') || '',
        aqi: airPollution.main.aqi,
        co: airPollution.components.co,
        no: airPollution.components.no,
        no2: airPollution.components.no2,
        o3: airPollution.components.o3,
        so2: airPollution.components.so2,
        pm2_5: airPollution.components.pm2_5,
        pm10: airPollution.components.pm10,
        nh3: airPollution.components.nh3
      }));
      update((state) => {
        state.airPollutions = airPollutions;
        return state;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setSelectedPeriod = (period: PeriodPol) => {
    update((state) => {
      state.selectedPeriod = period;
      return state;
    });
  };

  const updateAirPollution = (airPollution: AirPollution) => {
    update((state) => {
      state.airPollution = airPollution;
      return state;
    });
  };

  const updateAirPollutions = (airPollutions: AirPollution[]) => {
    update((state) => {
      state.airPollutions = airPollutions;
      return state;
    });
  }; */

  /* const filteredAirPollutions = (state: AirPollutionState): AirPollution[] => {
    switch (state.selectedPeriod) {
      case periodsPol[0]: // Ahora
        return [state.airPollution];
      case periodsPol[1]: // Hoy
        return state.airPollutions.filter((weather) =>
          DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal(), 'day')
        );
      case periodsPol[2]: // Mañana
        return state.airPollutions.filter((weather) =>
          DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal().plus({ days: 1 }), 'day')
        );
      case periodsPol[3]: // Próximos 5 días
        return state.airPollutions;
      default:
        return [];
    }
  }; */

  return {
    subscribe,
    fetchAirPollution,
    /* fetchAirPollutions,
    setSelectedPeriod,
    updateAirPollution,
    updateAirPollutions,
    filteredAirPollutions */
  };
};

export const airPollutionStore = createAirPollutionStore();