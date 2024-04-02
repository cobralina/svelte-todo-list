<script lang="ts">
  import type { Todo } from "$lib/types/Todo";
  import { DateTime } from "luxon";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let todosPromise: Promise<Todo[]> = fetch("/api/todos").then((res) =>
    res.json()
  );
  function updateTodo(item: Todo) {
    let data = fetch(`/api/todos/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({ done: item.done }),
      headers: { "Content-Type": "application/json" },
    });
  }
  function deleteTodo(item: Todo) {
    let data = fetch(`/api/todos/${item.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    todosPromise =fetch("/api/todos").then((d) => d.json());
  }
 
</script>

<div>
  <h1>Meine Todos</h1>

  {#await todosPromise}
    <div aria-busy="true"></div>
  {:then todos}
    <ul>
      {#each todos as todo (todo.id)}
        {@const overdue =
          DateTime.now().startOf("day") > DateTime.fromISO(todo.dueDate)}
        {@const due = DateTime.now().hasSame(
          DateTime.fromISO(todo.dueDate),
          "day"
        )}
        <li>
          <label for="todo-{todo.id}" class:overdue class:due>
            <input
              type="checkbox"
              bind:checked={todo.done}
              on:change={() => updateTodo(todo)}
              id="todo-{todo.id}"
            />
            {todo.title}
          </label>
          <button on:click={() => dispatch("goto:edit_todo", { ...todo })}>Bearbeiten</button>
          <button on:click={() => deleteTodo(todo)}>Löschen</button>
        </li>
      {:else}
        <p>Keine Aufgaben vorhanden.</p>
      {/each}
    </ul>
  {:catch error}
    <p class="error">{error.message}</p>
  {/await}
</div>

<style>
  button {
    margin-right:5px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    list-style: none;
    padding-top: var(--pico-spacing);
    padding-bottom: var(--pico-spacing);
    border-bottom: solid thin var(--pico-muted-border-color);
    margin: 0;
    display:flex;
  }

  li:first-child {
    border-top: solid thin var(--pico-muted-border-color);
  }

  label {
    margin: 0;
    width: 100%;
  }

  .error {
    color: var(--pico-color-red-500);
  }

  .due {
    color: var(--pico-color-pumpkin-500);
  }

  .overdue {
    color: var(--pico-color-orange-500);
  }
</style>
