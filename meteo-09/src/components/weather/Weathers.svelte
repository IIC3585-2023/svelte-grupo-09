<script lang="ts">
  import { onMount } from 'svelte';
  import { weatherStore } from '../../stores/weather';
  // import { useCity } from '../stores/city';
  import { periodsTemp } from '../../scripts/constants';
  import WeatherItem from './WeatherItem.svelte';
  // const cityStore = useCity();

  let weatherState;

  weatherStore.subscribe((state) => {
    weatherState = state;
  });

  const fetchData = async () => {
    // const { latitude, longitude } = cityStore.cities[cityStore.selectedCity];
    await Promise.all([
      weatherStore.fetchWeather(-33.4489, -70.6693),
      weatherStore.fetchWeathers(-33.4489, -70.6693),
    ]);
  };

  onMount(async () => {
    await fetchData();
  });

</script>

<!-- class="{ 'is-active': period === airPollutionStore.selectedPeriod }" -->

<nav class="is-primary panel">
  <span class="panel-tabs">
    {#each periodsTemp as period}
      <a
        class={period === weatherState.selectedPeriod ? 'is-active' : ''}
        on:click={() => weatherStore.setSelectedPeriod(period)}
      >
        {period}
      </a>
    {/each}
  </span>
  {#each weatherStore.filteredWeathers(weatherState) as weather}
    <WeatherItem weathers={weather.slice(1)} dayWeather={weather[0]} />
  {/each}
</nav>
