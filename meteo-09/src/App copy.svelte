<script lang="ts">
  import Router from 'svelte-spa-router';
  import Navbar from './components/Navbar.svelte';
  import AirPollutions from './components/cities/Cities.svelte';
  import Weathers from './components/weather/Weathers.svelte';
  import Sidebar from './Sidebar.svelte';
  import Rightbar from './Right.svelte';
  import { storeConnector } from './stores/unifiedStorage';

  const routes = {
    '/': Weathers,
    '/air-pollution': AirPollutions,
  };

  const fetchAllWeathers = async () => {
    await storeConnector.fetchWeatherAndForecastForAllCities();
  };
  fetchAllWeathers();
</script>

<main>
  <div class="app">
    <Sidebar />
    <div id="main-content">
      <Navbar />
      <Router {routes} />
    </div>
    <Rightbar />
  </div>
</main>

<style>
  @import 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css';
  @import '@fortawesome/fontawesome-free/css/all.css';
  .app {
    display: flex; /* añade esta línea */
    border: 10px solid red;
    max-width: 80vw;
    max-height: 95vh;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
</style>
