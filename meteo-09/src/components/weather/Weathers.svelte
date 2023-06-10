<script lang="ts">
  import { onMount } from 'svelte';
  import { weatherStore } from '../../stores/weather';
  import { cityStore } from '../../stores/city';
  import { periodsTemp } from '../../scripts/constants';
  import WeatherItem from './WeatherItem.svelte';
  

  let weatherState;
  let cityState;

  weatherStore.subscribe((state) => {
    weatherState = state;
  });

  cityStore.subscribe((state) => {
    cityState = state;
  });

  const fetchData = async () => {
    const { latitude, longitude } = cityState.cities[cityState.selectedCity];
    await Promise.all([
      weatherStore.fetchWeather(latitude, longitude),
      weatherStore.fetchWeathers(latitude, longitude),
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
  <!-- Revisar cómo llegan los datos frente a cambios de período, quiza hacer console log para ver las props en WeatherItem -->
  {#each weatherStore.filteredWeathers(weatherState) as weather}
    <WeatherItem weathers={weather.slice(1)} dayWeather={weather[0]} />
  {/each}
</nav>
