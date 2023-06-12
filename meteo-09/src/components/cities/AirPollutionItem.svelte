<script lang="ts">
  import Modal from '../Modal.svelte';
  import type { AirPollution } from '../../scripts/airPollution';

  export let airPollution: AirPollution;

  let showModal: boolean = false;

  const aqiColors = {
    1: 'is-success',
    2: 'is-warning is-light',
    3: 'is-warning',
    4: 'is-danger is-light',
    5: 'is-danger',
  };
</script>

<div class="card my-2 widget">
  <div class="content">
    <button
      class={`tag is-medium ${aqiColors[airPollution.aqi]}`}
      on:click={() => (showModal = true)}
    >
      AQI (Índice de Calidad del Aire):&nbsp;
      <b>{airPollution.aqi}</b>
    </button>
  </div>
  <table class="table">
    <thead class="thedy">
      <tr>
        <th>CO (μg/m3)</th>
        <th>NO (μg/m3)</th>
        <th>NO<sub>2</sub> (μg/m<sup>3</sup>)</th>
        <th>O<sub>3</sub> (μg/m<sup>3</sup>)</th>
        <th>SO<sub>2</sub> (μg/m<sup>3</sup>)</th>
        <th>NH<sub>3</sub> (μg/m<sup>3</sup>)</th>
        <th>PM<sub>2.5</sub> (μg/m<sup>3</sup>)</th>
        <th>PM<sub>10</sub> (μg/m<sup>3</sup>)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{airPollution.co}</td>
        <td>{airPollution.no}</td>
        <td>{airPollution.no2}</td>
        <td>{airPollution.o3}</td>
        <td>{airPollution.so2}</td>
        <td>{airPollution.nh3}</td>
        <td>{airPollution.pm2_5}</td>
        <td>{airPollution.pm10}</td>
      </tr>
    </tbody>
  </table>
</div>

<Modal bind:showModal>
  <h2 slot="header">Explicación AQI (Índice de Calidad del Aire)</h2>
  <table class="table is-bordered">
    <thead>
      <tr>
        <th>Nombre cualitativo</th>
        <th>AQI</th>
        <th colspan="6">Concentración de contaminantes en μg/m<sup>3</sup></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td />
        <td />
        <td>SO<sub>2</sub></td>
        <td>NO<sub>2</sub></td>
        <td>PM<sub>10</sub></td>
        <td>PM<sub>2.5</sub></td>
        <td>O<sub>3</sub></td>
        <td>CO</td>
      </tr>
      <tr>
        <td>Buena</td>
        <td class="is-flex is-align-items-center is-justify-content-center">
          <span class={`tag is-medium ${aqiColors[1]}`}><b>1</b></span>
        </td>
        <td>[0; 20)</td>
        <td>[0; 40)</td>
        <td>[0; 20)</td>
        <td>[0; 10)</td>
        <td>[0; 60)</td>
        <td>[0; 4400)</td>
      </tr>
      <tr>
        <td>Justa</td>
        <td class="is-flex is-align-items-center is-justify-content-center">
          <span class={`tag is-medium ${aqiColors[2]}`}><b>2</b></span>
        </td>
        <td>[20; 80)</td>
        <td>[40; 70)</td>
        <td>[20; 50)</td>
        <td>[10; 25)</td>
        <td>[60; 100)</td>
        <td>[4400; 9400)</td>
      </tr>
      <tr>
        <td>Moderada</td>
        <td class="is-flex is-align-items-center is-justify-content-center">
          <span class={`tag is-medium ${aqiColors[3]}`}><b>3</b></span>
        </td>
        <td>[80; 250)</td>
        <td>[70; 150)</td>
        <td>[50; 100)</td>
        <td>[25; 50)</td>
        <td>[100; 140)</td>
        <td>[9400-12400)</td>
      </tr>
      <tr>
        <td>Pobre</td>
        <td class="is-flex is-align-items-center is-justify-content-center">
          <span class={`tag is-medium ${aqiColors[4]}`}><b>4</b></span>
        </td>
        <td>[250; 350)</td>
        <td>[150; 200)</td>
        <td>[100; 200)</td>
        <td>[50; 75)</td>
        <td>[140; 180)</td>
        <td>[12400; 15400)</td>
      </tr>
      <tr>
        <td>Muy pobre</td>
        <td class="is-flex is-align-items-center is-justify-content-center">
          <span class={`tag is-medium ${aqiColors[5]}`}><b>5</b></span>
        </td>
        <td>⩾350</td>
        <td>⩾200</td>
        <td>⩾200</td>
        <td>⩾75</td>
        <td>⩾180</td>
        <td>⩾15400</td>
      </tr>
    </tbody>
  </table>
  <div class="has-text-left">
    <p>Otros parámetros que no afectan el cálculo del AQI:</p>
    <ul>
      <li>NH3: valor mínimo 0.1 - valor máximo 200</li>
      <li>NO: valor mínimo 0.1 - valor máximo 100</li>
    </ul>
  </div>
</Modal>

<style scoped>
  .table {
    background-color: #202b3b;
    color: aliceblue;
  }
  .table thead td,
  .table thead th {
    color: aliceblue;
  }
  @media (max-width: 900px) {
    .tag {
      font-size: 0.7rem;
    }
  }
</style>
