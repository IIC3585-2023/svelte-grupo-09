<script lang="ts">
  import Router from 'svelte-spa-router';
  import Navbar from './components/Navbar.svelte';
  import AirPollutions from './components/airPollution/AirPollutions.svelte';
  import Weathers from './components/weather/Weathers.svelte';
  import Sidebar from './Sidebar.svelte';
  import Rightbar from './Right.svelte';
  import { storeConnector } from './stores/unifiedStorage';

  const routes = {
    '/': Weathers,
    '/paises': AirPollutions,
  };
</script>

<main class="app">
  <div class="columns is-mobile is-gapless">
    <div class="column widget is-custom is-1">
      <Sidebar />
    </div>
    <div class="column is-custom is-8">
      <Navbar />
      <Router {routes} />
    </div>
    <div class="column widget is-custom is-3 no-shrink">
      <Rightbar />
    </div>
  </div>
</main>

<style>
  @import 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css';
  @import '@fortawesome/fontawesome-free/css/all.css';
  .columns.is-mobile.is-gapless > .column {
    flex-shrink: 0;
  }
  .app {
    max-width: 80vw;
    max-height: 95vh;
    margin: 0 auto;
    padding: 2rem;
  }

  .no-shrink {
    flex-shrink: 0 !important;
    min-width: 20rem !important;
  }

  @media (max-width: 900px) {
    .no-shrink {
      min-width: 0 !important;
    }
  }

  .is-custom {
    width: 100%;
    flex-basis: auto;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    margin-right: 1rem;
  }
  .column.is-3 {
    flex: 3;
  }
  .column.is-1 {
    flex: 1;
  }
  .column.is-8 {
    flex: 8;
  }
  @media (max-width: 1000px) {
    .columns.is-mobile.is-gapless {
      flex-direction: column;
    }
    .column.is-custom {
      flex: none;
      width: 100%;
    }
  }
</style>
