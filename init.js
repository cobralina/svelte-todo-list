import { writeFile } from "fs/promises";

import { DateTime } from "luxon";

const now = DateTime.now();
const todos = [
  {
    id: 1,
    title: "List Todos",
    done: false,
    dueDate: now.minus({ days: 1 }).toISODate(),
  },
  { id: 2, title: "Add Todo", done: false, dueDate: now.toISODate() },
  {
    id: 3,
    title: "Edit Todo",
    done: false,
    dueDate: now.plus({ days: 1 }).toISODate(),
  },
  {
    id: 4,
    title: "Delete Todo",
    done: false,
    dueDate: now.plus({ weeks: 1 }).toISODate(),
  },
  {
    id: 5,
    title: "Learned Svelte",
    done: false,
    dueDate: now.plus({ months: 1 }).toISODate(),
  },
];

await writeFile("./db.json", JSON.stringify({ todos }));
