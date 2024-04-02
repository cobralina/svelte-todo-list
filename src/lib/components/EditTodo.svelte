<script lang="ts">
  import type { Todo } from "$lib/types/Todo";
  import { createEventDispatcher } from "svelte";

  export let todo:Todo

  const dispatch = createEventDispatcher();

  function editData() {
    console.log("edit")
    let data = fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify( todo ),
      headers: { "Content-Type": "application/json" },
    });
    dispatch("goto:list_todos");

  }

  function getBack() {

  }

 
</script>

<div>
  <h1>Edit Todo</h1>

  <form>
    <input type="date" bind:value={todo.dueDate}>

    <input type="text" id="text" name="text" bind:value={todo.title}>

    <button on:click={() => editData()}>Submit</button>
    <button on:click={() => getBack()}>Cancel</button>


  </form>
  </div>

<style>



</style>
