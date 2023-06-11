<script lang="ts">
  import type { AirPollution } from '../../scripts/airPollution';

  export let airPollution: AirPollution;

  const aqiColors = {
    1: 'is-success',
    2: 'is-warning is-light',
    3: 'is-warning',
    4: 'is-danger is-light',
    5: 'is-danger',
  };
</script>

<div class="card my-2">
  <div class="card-content">
    <div class="content">
      <span class={`tag is-medium ${aqiColors[airPollution.aqi]}`}>
        AQI (Índice de Calidad del Aire):
        {airPollution.aqi}
      </span>
    </div>
    <div class="content">
      <p class="title is-4">{airPollution.dt}</p>
      <table class="table">
        <thead>
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
  </div>
</div>
