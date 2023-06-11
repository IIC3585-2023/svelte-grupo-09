<script setup lang="ts">
  import { cityStore } from "../stores/city";

  const { subscribe, setSelectedCity } = cityStore;
  let selectedCity = 0;

  subscribe((state) => {
    selectedCity = state.selectedCity;
  });
</script>

<div class="navbar">
  <div class="navbar-start">
    <div class="control">
      <div class="select">
        <select
          bind:value={selectedCity}
          on:change={() => setSelectedCity(selectedCity)}
        >
          {#each $cityStore.cities as city, index}
            <option value={index}>{city.name}</option>
          {/each}
        </select>
      </div>
    </div>
    <button class="button mx-2">Añadir ciudad</button>
  </div>
  <div class="navbar-end">
    <div class="buttons">
      <a class="button" href="#/">Temperaturas</a>
      <a class="button" href="#/air-pollution">Contaminación del aire</a>
    </div>
  </div>
</div>
