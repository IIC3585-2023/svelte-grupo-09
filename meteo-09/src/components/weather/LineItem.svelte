<script setup lang="ts">
  import type { Weather } from "../../scripts/weather";
  import SmallWeatherItem from "./SmallWeatherItem.svelte";
  import WeatherIcon from "./WeatherIcon.svelte";
  import { weatherStore } from "../../stores/weather";
  export let weathers: Weather[];
</script>

<div class="widget is-flex columns">
  {#each weatherStore.filterTodayWeather(weathers) as weather}
    <SmallWeatherItem weather={weather} />
  {/each}
</div>

<style scoped>
  .columns {
    margin: 0 !important;
    margin-bottom: 1rem !important;
  }
</style>
