<script lang="ts">
  import type { Todo } from "$lib/types/Todo";
  function sendData() {
    let data = fetch(`/api/todos/`, {
      method: "POST",
      body: JSON.stringify({ dueDate,title, done }),
      headers: { "Content-Type": "application/json" },
    });
  }

  function getBack() {

  }

  let dueDate="";
  let title="Aufgabentext";
  let done=false;
 
</script>

<div>
  <h1>New Todo</h1>

  <form>
    <input type="date" bind:value={dueDate}>

    <input type="text" id="text" name="text" bind:value={title}>

    <button on:click={() => sendData()}>Bestätigen</button>
    <button on:click={() => getBack()}>Abbrechen</button>


  </form>
  </div>

<style>



</style>
