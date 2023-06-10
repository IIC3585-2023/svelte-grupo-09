<script lang="ts">
  import type { Weather } from "../../scripts/weather";
  import { DateTime } from "luxon";
  import LineItem from "./LineItem.svelte";

  export let dayWeather: Weather;
  export let weathers: Weather[];

  console.log(weathers);
  console.log(dayWeather);
</script>

<div class="card my-2 weather-card">
    <div class="card-content">
      <div class="bg-light-grey">
        <div class="is-flex is-justify-content-space-between">
          <p class="title is-1 has-text-white">
            {
              DateTime.fromFormat(dayWeather.dt, "ff").toFormat(
                "cccc, d LLLL yyyy"
              )
            }
          </p>
          <p class="title is-2 has-text-white mr-6 has-text-weight-light">
            <!-- { cityStore.cities[cityStore.selectedCity].name } -->
            Santiago
          </p>
        </div>
        <div class="is-flex is-justify-content-space-between">
          <p class="subtitle is-4 has-text-white">
            <!-- { DateTime.fromFormat(dayWeather.dt, "ff").toFormat("HH:mm") } -->
          </p>
          <p class="title is-3 has-text-white mr-6 has-text-weight-light">
            <!-- { cityStore.cities[cityStore.selectedCity].country } -->
            Chile
          </p>
        </div>
      </div>

      <br />

      <div class="content has-text-white has-text-bold ">
        <div class="bg-light-grey" style="display: inline-block;">
          <p>Se siente como: { dayWeather.feels_like }°C</p>
          <p>Presión atmosférica: { dayWeather.pressure }hPa</p>
          <p>Humedad: { dayWeather.humidity }%</p>
        </div>
      </div>
      <LineItem weathers={weathers} dayWeather={dayWeather} />
    </div>
  </div>


<style scoped>
  .weather-card {
    background-size: cover;
    background-position: center;
  }
  
  .bg-light-grey {
    padding: 1rem;
    background-color: #3e3636d4;
    border: 2px solid #5b5454d4;
    border-radius: 5%;
    margin: 0 4px;
  }
  </style>