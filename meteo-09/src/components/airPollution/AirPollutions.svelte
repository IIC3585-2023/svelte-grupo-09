<script lang="ts">
  import { onMount } from 'svelte';
  import { airPollutionStore } from '../../stores/airPollution';
  // import { useCity } from '../stores/city';
  import { periodsPol } from '../../scripts/constants';
  import AirPollutionItem from './AirPollutionItem.svelte';

  // const cityStore = useCity();

  let airPollutionState;

  airPollutionStore.subscribe((state) => {
    airPollutionState = state;
  });

  const fetchData = async () => {
    // const { latitude, longitude } = cityStore.cities[cityStore.selectedCity];
    await Promise.all([
      airPollutionStore.fetchAirPollution(-33.4489, -70.6693),
      airPollutionStore.fetchAirPollutions(-33.4489, -70.6693),
    ]);
  };

  onMount(async () => {
    await fetchData();
  });

  // watch(
  //   () => [
  //     cityStore.cities[cityStore.selectedCity].latitude,
  //     cityStore.cities[cityStore.selectedCity].longitude,
  //   ],
  //   async () => {
  //     await fetchData();
  //   }
  // );

  // let filteredAirPollutions: ReturnType<
  //   typeof airPollutionStore.filteredAirPollutions
  // >;
</script>

<!-- class="{ 'is-active': period === airPollutionStore.selectedPeriod }" -->

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
