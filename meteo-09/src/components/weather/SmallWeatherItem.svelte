<script setup lang="ts">
  import type { Weather } from "../../scripts/weather";
  import { DateTime } from "luxon";
  import WeatherIcon from "./WeatherIcon.svelte";

  export let weather: Weather;
</script>

<div
  class=" bg column is-2 is-flex is-flex-direction-column is-align-items-center is-justify-content-space-around"
>
  <p class="title is-5 mb-2 has-text-white">
    {DateTime.fromFormat(weather.dt, "ff").startOf("hour").toFormat("HH:mm")}
  </p>
  <WeatherIcon {weather} />
  <div class="tag has-background-grey-light has-text-black is-medium">
    {weather.temp}°C
  </div>
</div>

<style scoped>
  .bg {
    border-right: 1px solid #dbdbdb65;
  }
</style>
