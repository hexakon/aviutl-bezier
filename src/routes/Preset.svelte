<script lang="ts">
  export let name: string;
  export let value: string;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li class="flex flex-col justify-center items-center bg-white dark:bg-slate-600 p-4 m-4 transition-all hover:scale-105 active:scale-100 active:bg-teal-50 dark:active:bg-teal-600 pseudobutton" on:mousedown={() => {navigator.clipboard.writeText(value); }}>
  <h1 class="text-2xl">{name}</h1>
  <p class="text-mono text-slate-600 dark:text-slate-400">{value}</p>
</li>