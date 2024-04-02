import "@picocss/pico";
import "@picocss/pico/css/pico.colors.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
