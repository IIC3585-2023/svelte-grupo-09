<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import FormInput from './FormInput.svelte';
  import type { City } from '../scripts/city';
  import type { Status } from '../scripts/validation';
  import {
    validate,
    required,
    isValidLatitude,
    isValidLongitude,
  } from '../scripts/validation';
  import { cityStore } from '../stores/city';

  let nameValue: string;
  let nameStatus: Status;
  const name = writable('');

  name.subscribe((value) => (nameValue = value));

  name.subscribe((value) => {
    const { valid, message } = validate(value, [required]);
    nameStatus = { valid, message };
  });

  let countryValue: string;
  let latitudeValue: string;
  let longitudeValue: string;
  let imageURLValue: string;

  let countryStatus: Status;
  let latitudeStatus: Status;
  let longitudeStatus: Status;
  let imageURLStatus: Status;

  const country = writable('');
  const latitude = writable('');
  const longitude = writable('');
  const imageURL = writable('');

  country.subscribe((value) => (countryValue = value));
  latitude.subscribe((value) => (latitudeValue = value));
  longitude.subscribe((value) => (longitudeValue = value));
  imageURL.subscribe((value) => (imageURLValue = value));

  country.subscribe((value) => {
    const { valid, message } = validate(value, [required]);
    countryStatus = { valid, message };
  });
  latitude.subscribe((value) => {
    const { valid, message } = validate(value, [required, isValidLatitude]);
    latitudeStatus = { valid, message };
  });
  longitude.subscribe((value) => {
    const { valid, message } = validate(value, [required, isValidLongitude]);
    longitudeStatus = { valid, message };
  });
  imageURL.subscribe((value) => {
    const { valid, message } = validate(value, [required]);
    imageURLStatus = { valid, message };
  });

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    const newCity: City = {
      name: nameValue,
      country: countryValue,
      latitude: Number(latitudeValue),
      longitude: Number(longitudeValue),
      imageURL: imageURLValue,
    };
    cityStore.addCity(newCity);
    dispatch('update:closeModal', false);
  }
</script>

<form class="form" on:submit|preventDefault={handleSubmit}>
  <FormInput
    name="Nombre de la ciudad"
    bind:modelValue={nameValue}
    bind:status={nameStatus}
    on:update:modelValue={(event) => name.set(event.detail)}
  />
  <FormInput
    name="País de la ciudad"
    bind:modelValue={countryValue}
    bind:status={countryStatus}
    on:update:modelValue={(event) => country.set(event.detail)}
  />
  <FormInput
    name="Latitud"
    bind:modelValue={latitudeValue}
    bind:status={latitudeStatus}
    on:update:modelValue={(event) => latitude.set(event.detail)}
  />
  <FormInput
    name="Longitud"
    bind:modelValue={longitudeValue}
    bind:status={longitudeStatus}
    on:update:modelValue={(event) => longitude.set(event.detail)}
  />
  <FormInput
    name="URL de la imagen"
    bind:modelValue={imageURLValue}
    bind:status={imageURLStatus}
    on:update:modelValue={(event) => imageURL.set(event.detail)}
  />
  <button class="button is-primary">Añadir</button>
</form>

<style>
  .form {
    padding-left: 30px;
    padding-right: 30px;
  }
</style>
