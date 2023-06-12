<script setup lang="ts">
  import { cityStore } from "../stores/city";

  const { subscribe, setSelectedCity } = cityStore;
  let selectedCity = 0;

  subscribe((state) => {
    selectedCity = state.selectedCity;
  });
</script>

<div class=" navbar widget bg">
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
  <div class="navbar-end" />
</div>

<style>
  .bg {
    background-color: #202b3b;
    min-width: 40vw;
    margin-bottom: 1rem;
  }
  @media (max-width: 900px) {
    .bg {
      min-width: 0;
    }
  }
</style>
