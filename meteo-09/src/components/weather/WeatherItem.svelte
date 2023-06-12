<script lang="ts">
  import type { Weather } from "../../scripts/weather";
  import { DateTime } from "luxon";
  import { cityStore } from "../../stores/city";
  import LineItem from "./LineItem.svelte";
  import WeatherIcon from "./WeatherIcon.svelte";

  let cityState;

  export let dayWeather: Weather;
  export let weathers: Weather[];

  cityStore.subscribe((state) => {
    cityState = state;
  });
</script>

<div
  class="weather-card widget card"
  style={`background-image: url(${
    cityState.cities[cityState.selectedCity].imageURL
  })`}
>
  <div class="card-content">
    <div class="is-flex is-justify-content-space-between">
      <p
        class="title is-1 is-size-6-mobile has-text-white has-text-weight-medium"
      >
        {cityState.cities[cityState.selectedCity].name}
      </p>
      <WeatherIcon weather={dayWeather} size="is-128x128" />
    </div>
    <div class="is-flex">
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
    </div>

    <br />
  </div>
</div>

<style scoped>
  .weather-card {
    background-size: cover;
    background-position: center;
    margin-bottom: 1rem;
  }

  .bg-light-grey {
    background-color: #3e3636d4;
    border: 2px solid #5b5454d4;
    border-radius: 5%;
    margin: 0 4px;
  }
</style>
