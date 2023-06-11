<script lang="ts">
  import Router from 'svelte-spa-router';
  import Navbar from './components/Navbar.svelte';
  import AirPollutions from './components/airPollution/AirPollutions.svelte';
  import Weathers from './components/weather/Weathers.svelte';

  const routes = {
    '/': Weathers,
    '/air-pollution': AirPollutions,
  };
</script>

<main>
  <div class="section">
    <div class="container">
      <div class="app-header">
        <h1 class="app-name">ClimaPuro</h1>
        <p class="app-slogan">
          Información precisa sobre el clima y la calidad del aire en tiempo
          real
        </p>
      </div>
      <Navbar />
      <div id="content">
        <Router {routes} />
      </div>
    </div>
  </div>
</main>

<style>
  @import 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css';
</style>
