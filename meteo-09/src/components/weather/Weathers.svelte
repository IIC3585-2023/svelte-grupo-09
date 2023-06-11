<script lang="ts">
  import { onMount } from "svelte";
  import { weatherStore } from "../../stores/weather";
  import { cityStore } from "../../stores/city";
  import { periodsTemp } from "../../scripts/constants";
  import WeatherItem from "./WeatherItem.svelte";

  let weatherState;
  let cityState;

  const fetchData = async () => {
    const { latitude, longitude } = cityState.cities[cityState.selectedCity];
    await Promise.all([
      weatherStore.fetchWeather(latitude, longitude),
      weatherStore.fetchWeathers(latitude, longitude),
    ]);
  };

  weatherStore.subscribe((state) => {
    weatherState = state;
  });

  cityStore.subscribe((state) => {
    cityState = state;
    fetchData();
  });

  onMount(async () => {
    await fetchData();
  });
</script>

<nav class="panel is-primary">
  <div class="panel-tabs">
    {#each periodsTemp as period}
      <button
        class="tab-button has-text-light"
        class:is-active={period === weatherState.selectedPeriod}
        on:click={() => weatherStore.setSelectedPeriod(period)}
      >
        {period}
      </button>
    {/each}
  </div>
  {#each weatherStore.filteredWeathers(weatherState) as weather}
    <WeatherItem weathers={weather.slice(1)} dayWeather={weather[0]} />
  {/each}
</nav>

<style>
  .tab-button {
    border: none;
    background: none;
    padding: 10px;
    cursor: pointer;
    outline: inherit;
    font: inherit;
    border-bottom: 5px solid transparent;
    transition: all 0.3s ease;
  }
  .tab-button:hover {
    border-bottom: 5px solid #00d1b2;
  }
  .tab-button.is-active {
    border-bottom: 5px solid #00d1b2;
  }
</style>
