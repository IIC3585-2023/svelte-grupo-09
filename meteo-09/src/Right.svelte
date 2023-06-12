<script setup lang="ts">
  import { weatherStore } from "./stores/weather";
  import { storeConnector } from "./stores/unifiedStorage";

  import WeeklyItem from "./components/weather/WeeklyItem.svelte";

  let state;

  storeConnector.subscribe((value) => {
    state = value;
  });
</script>

<div>
  <div class="widget is-flex is-flex-direction-column">
    {#if state.status === "loading"}
      <p>Loading...</p>
    {:else}
      <!--       {#each state.todayForeCastForThisCity as weather}
 -->
      <div class="mb-5 has-text-bold title is-5 has-text-grey">
        7-day forecast
      </div>
      {#each weatherStore.filterNextDaysWeathers(state.todayForeCastForThisCity) as weather}
        <WeeklyItem weather={weather[0]} />
      {/each}

      <!--       {/each}
 -->
    {/if}
  </div>
</div>

<style scoped>
</style>
