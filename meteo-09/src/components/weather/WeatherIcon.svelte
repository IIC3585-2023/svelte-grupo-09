<script lang="ts">
    import { onMount } from 'svelte';
    import cloudyImg from "../../assets/cloudy.png";
    import rainyImg from "../../assets/rainy.png";
    import sunImg from "../../assets/sun.png";
  
    export let weather: string;
    export let size: string = "is-48x48";
  
    let imageSrc: string = sunImg;
    let altText: string = "";
  
    onMount(() => {
      updateImageAndAltText();
    });
  
    function updateImageAndAltText(): void {
      if (weather === "Clouds") {
        imageSrc = cloudyImg;
        altText = "cloudy day";
      } else if (weather === "Rain") {
        imageSrc = rainyImg;
        altText = "rainy day";
      } else if (weather === "Clear") {
        imageSrc = sunImg;
        altText = "sunny day";
      } else {
        imageSrc = sunImg;
        altText = "";
      }
    }
</script>
<figure class={`image ${size} mb-2`}>
    <img src={`${imageSrc}`} alt="altText" />
</figure>