<script lang="ts">
  export let showModal: boolean;

  let dialog: HTMLDialogElement;

  $: if (dialog && showModal) dialog.showModal();
  $: {
    if (dialog && !showModal) {
      dialog.close();
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <div on:click|stopPropagation>
    <slot name="header" />
    <hr />
    <slot />
    <hr />
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus on:click={() => dialog.close()}>Cerrar</button>
  </div>
</dialog>
