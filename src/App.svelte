<script lang="ts">
  import TodoList from "$lib/components/TodoList.svelte";
  import NewTodo from "$lib/components/NewTodo.svelte";
  import EditTodo from "$lib/components/EditTodo.svelte";

  import type { Todo } from "$lib/types/Todo";

  import { ListTodo } from "lucide-svelte";

  let view = "list_todos";
  let selectedTodo: Todo;

  function newTodo() {
    view = "new_todo";
  }
  function editTodo(event: CustomEvent<Todo>) {
    view = "edit_todo";
    selectedTodo = event.detail;
  }
</script>

<div class="wrapper">
  <header>
    <nav class="container">
      <ul>
        <li><strong><ListTodo /> Svelte TodoList</strong></li>
      </ul>
    </nav>
  </header>

  <main class="container">
    {#if view === "list_todos"}
      <TodoList on:goto:edit_todo={editTodo}/>
      <button class="newtask" on:click={() => newTodo()} > New Task </button>
    {:else if view === "new_todo"}
    <NewTodo />
    {:else if view === "edit_todo"}
    <EditTodo todo={selectedTodo} on:goto:list_todos={() => view = "list_todos"} />
    {/if}
  </main>

  <footer>
    <div class="container">&copy; 2024 Svelte TodoList</div>
  </footer>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-rows: min-content auto min-content;
    height: 100vh;
  }

  header {
    border-bottom: solid thin var(--pico-muted-border-color);
  }

  nav {
    display: flex;
    justify-content: center;
  }

  .newtask {
    margin: 0 auto;
    height:80px;
  }

  main {
    display: grid;
    padding-top: var(--pico-spacing);
    padding-bottom: var(--pico-spacing);
  }

  footer {
    font-size: 0.875em;
    padding-top: var(--pico-spacing);
    padding-bottom: var(--pico-spacing);
    text-align: center;
    border-top: solid thin var(--pico-muted-border-color);
  }
</style>
