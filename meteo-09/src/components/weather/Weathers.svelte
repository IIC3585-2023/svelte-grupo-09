<script lang="ts">
  import { onMount } from 'svelte';
  import { cityStore } from '../../stores/city';
  import WeatherItem from './WeatherItem.svelte';
  import LineItem from './LineItem.svelte';
  import AirPollutionItem from '../cities/AirPollutionItem.svelte';

  import { storeConnector } from '../../stores/unifiedStorage';

  let state;
  let cities;
  cityStore.subscribe((value) => {
    cities = value.cities;
  });

  onMount(async () => {
    await cityStore.fetchCities(cities);
  });

  storeConnector.subscribe((value) => {
    state = value;
  });
</script>

<div>
  {#if state.status === 'loading'}
    <p>Loading...</p>
  {:else}
    <WeatherItem dayWeather={state.todayWeatherForThisCity} />
    <LineItem weathers={state.todayForeCastForThisCity.slice(1)} />
    <AirPollutionItem airPollution={state.todayPollutionForThisCity} />
  {/if}
</div>
