<script lang="ts">
  import type { Weather } from "../../scripts/weather";
  import { cityStore } from "../../stores/city";
  import WeatherIcon from "./WeatherIcon.svelte";

  let cityState;

  export let dayWeather: Weather;
  export let id: number;
  cityStore.subscribe((state) => {
    cityState = state;
  });
</script>

<div
  class="weather-card widget card"
  style={`background-image: url(${cityState.cities[id].imageURL})`}
>
  <div class="is-flex is-justify-content-space-between is-align-items-center">
    <p
      class="title is-1 is-size-6-mobile has-text-white has-text-weight-medium no-shrink"
    >
      {cityState.cities[id].name}
    </p>
    <div>
      <p class="tag is-6 mb-2 has-text-white has-background-grey">Máxima</p>
      <p class="title is-3 mb-2 has-text-white">
        {Math.round(dayWeather.temp_max)}°C
      </p>
    </div>
    <div>
      <p class="tag is-6 mb-2 has-text-white has-background-grey">Mínima</p>
      <p class="title is-3 mb-2 has-text-white">
        {Math.round(dayWeather.temp_min)}°C
      </p>
    </div>
    <WeatherIcon weather={dayWeather} size="is-128x128" />
  </div>
</div>

<style scoped>
  .weather-card {
    background-size: cover;
    background-position: center;
    margin-bottom: 1rem;
  }
  .no-shrink {
    flex-shrink: 0;
  }
</style>
