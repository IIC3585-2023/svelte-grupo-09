<script lang="ts">
  import cloudyImg from '../../assets/cloudy.png';
  import rainyImg from '../../assets/rainy.png';
  import sunImg from '../../assets/sun.png';
  import type { Weather } from '../../scripts/weather';

  export let weather: Weather;
  export let size: string = 'is-48x48';

  let imageSrc: string = sunImg;
  let altText: string = '';

  $: {
    let weatherType = weather.type_weather;
    if (weatherType === 'Clouds') {
      imageSrc = cloudyImg;
      altText = 'cloudy day';
    } else if (weatherType === 'Rain') {
      imageSrc = rainyImg;
      altText = 'rainy day';
    } else if (weatherType === 'Clear') {
      imageSrc = sunImg;
      altText = 'sunny day';
    } else {
      imageSrc = sunImg;
      altText = '';
    }
  }
</script>

<figure class={`image ${size} mb-2 is-1-mobile`}>
  <img src={imageSrc} alt={altText} />
</figure>
