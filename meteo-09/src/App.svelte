<script lang="ts">
  import Router from 'svelte-spa-router';
  import Navbar from './components/Navbar.svelte';
  import Counter from './lib/Counter.svelte'

  // const routes = {
  //   '/': DogViewer,
  //   '/air-pollution': Profile
  // }
</script>

<main>
  <div class="app-header">
    <h1 class="app-name">ClimaPuro</h1>
    <p class="app-slogan">Información precisa sobre el clima y la calidad del aire en tiempo real</p>
  </div>
  <Navbar />
  <div class="card">
    <Counter />
  </div>
  <!-- <div id="content">
    <Router {routes}/>
  </div>         -->
</main>

<style>
  @import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
