<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import { airPollutionStore } from '../../stores/airPollution';
  import { cityStore } from '../../stores/city';
  import { periodsPol } from '../../scripts/constants';
  import AirPollutionItem from './AirPollutionItem.svelte';

  let airPollutionState;
  let cityState;

  const fetchData = async () => {
    const { latitude, longitude } = cityState.cities[cityState.selectedCity];
    await Promise.all([
      airPollutionStore.fetchAirPollution(latitude, longitude),
      airPollutionStore.fetchAirPollutions(latitude, longitude),
    ]);
  };

  airPollutionStore.subscribe((state) => {
    airPollutionState = state;
  });

  cityStore.subscribe((state) => {
    cityState = state;
    fetchData();
  });

  onMount(async () => {
    await fetchData();
  });
</script> -->

<!-- <nav class="is-primary panel">
  <span class="panel-tabs">
    {#each periodsPol as period}
      <button
        class="tab-button has-text-light"
        class:is-active={period === airPollutionState.selectedPeriod}
        on:click={() => airPollutionStore.setSelectedPeriod(period)}
      >
        {period}
      </button>
    {/each}
  </span>
  {#each airPollutionStore.filteredAirPollutions(airPollutionState) as airPollution}
    <AirPollutionItem {airPollution} />
  {/each}
</nav> -->

<!-- <style>
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
</style> -->

<script>
  import { storeConnector } from '../../stores/unifiedStorage';
  import ItemCity from '../weather/ItemCity.svelte';

  let state;

  storeConnector.subscribe((value) => {
    state = value;
  });
</script>

<div>
  <!-- this is the multi country weather not air pollution   -->
  {#if state.status === 'loading'}
    <p>Loading...</p>
  {:else}
    {#each state.todayWeatherForAllCities as weather, i (i)}
      <ItemCity dayWeather={weather} id={i} />
    {/each}
  {/if}
</div>
