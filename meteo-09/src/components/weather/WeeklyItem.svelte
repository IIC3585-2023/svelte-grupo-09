<script setup lang="ts">
  import type { Weather } from "../../scripts/weather";
  import { DateTime } from "luxon";
  import WeatherIcon from "./WeatherIcon.svelte";

  export let weather: Weather;
  let dayToShow = DateTime.fromFormat(weather.dt, "ff").hasSame(
    DateTime.now(),
    "day"
  )
    ? "Today"
    : DateTime.fromFormat(weather.dt, "ff").toFormat("EEE");
</script>

<div class="usable columns">
  <div class=" column bg-light-grey has-text-grey is-one-quarter has-text-left">
    {dayToShow}
  </div>

  <div
    class=" column bg-light-grey is-justify-content-space-between has-text-white is-divider-vertical"
  >
    <WeatherIcon {weather} />
    {weather.type_weather}
  </div>

  <div
    class="column bg-light-grey is-one-quarter has-text-white is-size-6 has-text-weight-light"
  >
    {weather.temp_max}°C
  </div>
</div>

<style scoped>
  .bg-light-grey {
    display: flex;
    align-items: center;
  }
  .usable {
    border-bottom: 1px solid #dbdbdb65;
    margin: 0 0.5rem;
  }
</style>
