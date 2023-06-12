<script lang="ts">
  import { onMount } from "svelte";
  import { weatherStore } from "../../stores/weather";
  import { cityStore } from "../../stores/city";
  import { periodsTemp } from "../../scripts/constants";
  import WeatherItem from "../weather/WeatherItem.svelte";
  import LineItem from "../weather/LineItem.svelte";
  import AirPollutionItem from "../airPollution/AirPollutionItem.svelte";

  import { storeConnector } from "../../stores/unifiedStorage";
  import ItemCity from "../weather/ItemCity.svelte";

  let state;

  storeConnector.subscribe((value) => {
    state = value;
    console.log(state);
  });
</script>

<div>
  {#if state.status === "loading"}
    <p>Loading...</p>
  {:else}
    {#each state.todayWeatherForAllCities as weather, i (i)}
      <ItemCity dayWeather={weather} id={i} />
    {/each}
  {/if}
</div>

<style scoped>
  .main-component {
    margin: 5%;
  }
</style>
