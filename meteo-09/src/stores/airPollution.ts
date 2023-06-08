import { DateTime } from 'luxon';
import { writable, get } from 'svelte/store';
import { onMount } from 'svelte';

export const airPollution = writable({
    dt: '',
    aqi: 0,
    co: 0,
    no: 0,
    no2: 0,
    o3: 0,
    so2: 0,
    pm2_5: 0,
    pm10: 0,
    nh3: 0
});

export const airPollutions = writable([]);

export let selectedPeriod = writable('Ahora');

export async function fetchAirPollution(latitude, longitude) {
try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`);
    const data = await response.json();
    const body = data.list[0];
    const newAirPollution = {
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
    airPollution.set(newAirPollution);
} catch (error) {
    console.error(error);
}
}

export async function fetchAirPollutions(latitude, longitude) {
try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`);
    const data = await response.json();
    const newAirPollutions = data.list.map((airPollution) => ({
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
    airPollutions.set(newAirPollutions);
} catch (error) {
    console.error(error);
}
}

export function setSelectedPeriod(period) {
selectedPeriod = period;
}

let unsubscribe;
onMount(() => {
// Suscribe a los cambios en selectedPeriod para filtrar las airPollutions
unsubscribe = selectedPeriod.subscribe(() => {
    airPollutions.update((currentAirPollutions) => {
    switch (selectedPeriod) {
        case periodsPol[0]: // Ahora
        return [airPollution.get()];

        case periodsPol[1]: // Hoy
        return currentAirPollutions.filter((weather) =>
            DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal(), 'day')
        );

        case periodsPol[2]: // Mañana
        return currentAirPollutions.filter((weather) =>
            DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal().plus({ days: 1 }), 'day')
        );

        case periodsPol[3]: // Próximos 5 días
        return currentAirPollutions;

        default:
        return currentAirPollutions;
    }
    });
});
});

onCleanup(() => {
    // Limpia la suscripción cuando el componente se destruye
    unsubscribe();
});

// Exporta las constantes necesarias
export const PeriodPol = ['Ahora', 'Hoy', 'Mañana', 'Próximos 5 días'];
export const periodsPol = PeriodPol;
