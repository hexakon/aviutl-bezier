<title>AviUtl Bezier</title>
<svelte:head>
  <script lang="ts">
    document.documentElement.classList.add("dark", localStorage.theme === "dark" || !localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  </script>
	
	<!-- Anti-flickering script -->
	<script>
	var  timeout = 3000; // Timeout value to remove the flicker (in milliseconds)
	!function(h,i,d,e){var  t,n=h.createElement("style");n.id=e,n.innerHTML="body{opacity:0}",h.head.appendChild(n),t=d,i.rmfk=function(){var  t=h.getElementById(e);t&&t.parentNode.removeChild(t)},setTimeout(i.rmfk,t)}(document,window,timeout,"abhide");
	</script>
	
	<!-- Mida A/B Testing Script -->
	<script type="text/javascript" async src="https://cdn.mida.so/js/optimize.js?key=34MV9Wnqd0m0LYXrGNLpJw"></script>

</svelte:head>

<script lang="ts">

  /*import { onMount } from "svelte"; // for localstorage access
  onMount(() => {
    if (!localStorage.getItem("darkmode?")) { localStorage.setItem("darkmode?","false")}
    else if (localStorage.getItem("darkmode?") === "true") { toggleDarkMode(); }
  });*/

  // temporarily commented out since localstorage does not seem to be a good way to store theme preference,
  // due to it taking a moment AFTER page render to read and update.

  import DownArrow from "$lib/svg/DownArrow.svelte";
  import { presets } from "$lib/easings.json";
	import Preset from "./Preset.svelte";

  let input: string = "";
  let num: Array<string> = [];
  let output: string = "";
  let graphSize: number = 200;
  let arrowColor: string = "text-slate-300";

  const convert = (event: any) => {

    if (input.match(/-?[0-9]*\.?[0-9]+/g) === null) { // if no numbers, stop
      arrowColor = "text-slate-300";
      num = [];
      output = "";
      return;
    }

    num = input.match(/-?[0-9]*\.?[0-9]+/g)!.join(" ").split(" ");
    
    if (num.length < 4) { // if there aren't at least 4 values, stop
      arrowColor = "text-red-500";
      output = "";
      return;
    }

    num = num.slice(num.length-4); // just the last 4 numbers, if there are more

    output = "{"
           +  (Number(num[0]) * graphSize - graphSize/2) + ","
           + -(Number(num[1]) * graphSize - graphSize/2) + ","
           +  (Number(num[2]) * graphSize - graphSize/2) + ","
           + -(Number(num[3]) * graphSize - graphSize/2) + "}";
    arrowColor = "text-emerald-500";
  }

  let copytext: string = "click here to copy output to clipboard";

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkmode?","false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkmode?","true");
    }
  }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="py-3 tracking-widest md:tracking-[.5em] text-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-50 transition-colors pseudobutton" on:click={toggleDarkMode}>click here to switch theme</div>
<h1 class="p-4 text-5xl mb-12 bg-slate-200 dark:bg-slate-800"><a href="https://www.videohelp.com/software/AviUtl">AviUtl</a> Cubic Bezier Function Converter</h1>
<div id="everything" class="flex justify-center items-center flex-col max-w-7xl mx-auto px-2">

  <p class="text-2xl mb-2">
    Begin by selecting a CSS cubic-bezier function from 
    <a href="https://easings.net" target="_blank">easings.net</a>
     or 
    <a href="https://cubic-bezier.com" target="_blank">cubic-bezier.com</a>, then paste it into the box below.
  </p>
  <p class="text-xl mb-4">The tool will read the last four numbers to use as the cubic bezier function arguments.</p>
  <input type="text" bind:value={input} on:input={convert} size="50" class=" max-w-full text-2xl text-center p-2 mb-6 font-mono" />
  
  <p class="text-xl mb-4">the <b>BezierTrackT</b> object's <b>GraphSize</b> is set to <input type="number" size="5" step="1" bind:value={graphSize} min="1" max="1000" on:input={convert} />. (if you don't know what it is, leave it at 200.)</p>
  
  
  <DownArrow css={"size-24 block "+arrowColor}/>
  
  <p class={"mb-4 "+arrowColor}>
    {#if (0 < num.length && num.length < 4)}
      Only found {num.length} number{#if (num.length>1)}s{/if} in input: {num.join(", ")}
    {:else if (num.length === 0)}
      Waiting for input.
    {:else}
      Reading input: {num.join(", ")}
    {/if}
  </p>
  
  <input type="text" disabled bind:value={output} class="max-w-full font-mono text-center text-3xl px-2 py-3" size="30">
  <button class="border-teal-600 border-2 block my-2 px-2 py-1 text-xl w-full sm:max-w-96 text-center transition-transform active:scale-95" on:mouseleave={() => {copytext = "click here to copy output to clipboard"}} on:mousedown={() => {
    if (output !== "") { navigator.clipboard.writeText(output); copytext = "copied!"}
    else { copytext = "nothing to copy!" }}}
  >{copytext}</button>

  <p class="text-2xl mb-16">Finally, paste the output into the <b>Anchor</b> parameter in the object setting.</p>
  <p class="w-full border-b-slate-300 border-b-2 mb-8"></p>

  <p class="text-3xl">Alternatively, here are some presets for quick grabbing!</p>
  <p class="text-lg mb-6">(all values assume GraphSize = 200. click to copy)</p>

  <ul class="grid grid-cols-1 md:grid-cols-3 w-full mb-40">
    {#each presets as preset}
      <Preset name={preset.name} value={preset.value} />
    {/each}
  </ul>
</div>


<footer class="flex flex-col justify-center items-center py-20 bg-slate-200 dark:bg-slate-600">
  <p>© hexakon 2024</p>
  <p>a super simple sveltekit practice done over two days.</p>
  <a href="https://github.com/Hexakon/aviutl-bezier" target="_blank">github sauce</a>
</footer>
