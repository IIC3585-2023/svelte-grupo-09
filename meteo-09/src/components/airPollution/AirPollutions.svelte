<script lang="ts">
  import { storeConnector } from "../../stores/unifiedStorage";
  import ItemCity from "../weather/ItemCity.svelte";

  let state;

  storeConnector.subscribe((value) => {
    state = value;
    console.log(state);
  });
</script>

<div>
  <!-- this is the multi country weather not air pollution   -->
  {#if state.status === "loading"}
    <p>Loading...</p>
  {:else}
    {#each state.todayWeatherForAllCities as weather, i (i)}
      <ItemCity dayWeather={weather} id={i} />
    {/each}
  {/if}
</div>
