<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Status } from '../scripts/validation';

  export let name: string;
  export let modelValue: string;
  export let status: Status;

  const dispatch = createEventDispatcher();

  function handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    dispatch('update:modelValue', value);
  }
</script>

<div class="field">
  <label for={name} class="label has-text-white">{name}</label>
  <div class="control">
    <input
      type="text"
      class="input"
      id={name}
      bind:value={modelValue}
      on:input={handleInput}
    />
  </div>
  {#if !status.valid}
    <p class="is-danger help">{status.message}</p>
  {/if}
</div>
