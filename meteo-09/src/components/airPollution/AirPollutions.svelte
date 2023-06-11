<script lang="ts">
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
</script>

<nav class="is-primary panel">
  <span class="panel-tabs">
    {#each periodsPol as period}
      <a
        class={period === airPollutionState.selectedPeriod ? 'is-active' : ''}
        on:click={() => airPollutionStore.setSelectedPeriod(period)}
      >
        {period}
      </a>
    {/each}
  </span>
  {#each airPollutionStore.filteredAirPollutions(airPollutionState) as airPollution}
    <AirPollutionItem {airPollution} />
  {/each}
</nav>
