<script setup lang="ts">
    import type { Weather } from "../../scripts/weather";
    import SmallWeatherItem from "./SmallWeatherItem.svelte";
    import WeatherIcon from "./WeatherIcon.svelte";
    import { writable } from "svelte/store";

    export let weathers: Weather[];
    export let dayWeather: Weather;

    const isCollapsed = writable(false);

    const toggleCollapse = () => {
        isCollapsed.update(value => !value);
    };

    const getTranslationValue = (index: number) => {
        return isCollapsed.subscribe(value => value ? `-${index * 107}%` : "0");
    };

    const getOpacityValue = () => {
        return isCollapsed.subscribe(value => value ? 0 : 1);
    };
</script>

<div class="columns pt-6 pb-4">
    <div class="bg-light-grey column is-3">
        <div class="py-2 is-flex is-flex-direction-row pl-3 is-flex is-flex-direction-row">
            <weather-icon class="mr-6 mt-3" size="is-128x128" :weather="dayWeather.type_weather" />
            <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-around">
                <div style="white-space: nowrap;">
                <p class="tag is-6 mb-2 has-text-white has-background-grey">
                    Máxima
                </p>
                <p class="title is-3 mb-2 has-text-white">
                    { Math.round(dayWeather.temp_max) }°C
                </p>
                </div>
                <div>
                <p class="tag is-6 mb-2 has-text-white has-background-grey">
                    Mínima
                </p>
                <p class="title is-3 mb-2 has-text-white">
                    { Math.round(dayWeather.temp_min) }°C
                </p>
                </div>
            </div>
            <!-- <button class="buttoncito is-small" @click="toggleCollapse"></button> -->
        </div>
    </div>

    <!-- {#each weathers as weather, index}
        <SmallWeatherItem class={`${ SmallWeatherItem, collapsed=isCollapsed }`}
            :key="index" :weather="weather" :style="{
            transform: `translateX(${getTranslationValue(index)})`,
            opacity: getOpacityValue(),
            }" />
    {/each} -->
</div>
    
<style scoped>
    .SmallWeatherItem {
      transition: transform 1s ease-out, opacity 0.7s ease-in 0.2s;
    }
    
    .bg-light-grey {
      background-color: #3e3636d4;
      border: 2px solid #5b5454d4;
      border-radius: 5%;
      margin: 0 4px;
    }
    
    .buttoncito {
      width: 30px;
      margin-left: 20px;
      background-color: #3e3636d4;
    }
</style>