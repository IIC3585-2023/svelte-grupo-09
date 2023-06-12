<script setup lang="ts">
  import { weatherStore } from "./stores/weather";
  import { storeConnector } from "./stores/unifiedStorage";

  import WeeklyItem from "./components/weather/WeeklyItem.svelte";

  let state;

  storeConnector.subscribe((value) => {
    state = value;
    console.log(state);
  });
</script>

<div>
  <div class="widget is-flex is-flex-direction-column">
    {#if state.status === "loading"}
      <p>Loading...</p>
    {:else}
      <div class="mb-5 has-text-bold title is-5 has-text-grey">
        6-day forecast
      </div>
      {#each weatherStore.filterNextDaysWeathers(state.todayForeCastForThisCity) as weather}
        <WeeklyItem weather={weather[0]} />
      {/each}
    {/if}
  </div>
</div>

<style scoped>
</style>
