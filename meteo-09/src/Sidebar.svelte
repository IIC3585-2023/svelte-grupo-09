<script>
  import { push } from 'svelte-spa-router';
</script>

<div>
  <aside class="menu">
    <ul class="menu-list">
      <li>
        <a class="square-button" on:click={() => push('/')}>
          <span class="icon"><i class="fas fa-cloud-sun fa-lg" /></span>
          <span>Clima</span>
        </a>
      </li>
      <li>
        <a class="square-button" on:click={() => push('/paises')}>
          <span class="icon"><i class="fas fa-smog fa-lg" /></span>
          <span>Países</span>
        </a>
      </li>
    </ul>
  </aside>
</div>

<style scoped>
  a.square-button {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100px;
    padding: 10px;
    border-radius: 0;
  }

  .square-button .icon {
    margin-bottom: 10px;
  }

  .square-button span {
    color: white;
    font-size: 0.8em;
  }
</style>
