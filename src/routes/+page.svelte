<title>AviUtl Bezier</title>

<script lang="ts">

  import DownArrow from "$lib/svg/DownArrow.svelte";
  import { presets } from "$lib/easings.json";

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

</script>

<div class="h-8"></div>
<h1 class="text-center p-4 text-5xl mb-12 bg-slate-200"><a href="https://www.videohelp.com/software/AviUtl">AviUtl</a> Cubic Bezier Function Converter</h1>
<div id="everything" class="flex justify-center items-center flex-col max-w-7xl mx-auto">

  <p class="text-2xl mb-2">
    Begin by selecting a CSS cubic-bezier function from 
    <a href="https://easings.net" target="_blank">easings.net</a>
     or 
    <a href="https://cubic-bezier.com" target="_blank">cubic-bezier.com</a>, then paste it into the box below.
  </p>
  <p class="text-xl mb-4">The tool will read the last four numbers to use as the cubic bezier function arguments.</p>
  <input type="text" bind:value={input} on:input={convert} size="50" class="text-2xl text-center py-2 mb-6 font-mono" />
  
  <p class="text-xl mb-4">the <b>BezierTrackT</b> object's <b>GraphSize</b> is set to <input type="number" size="5" bind:value={graphSize} min="1" max="1000" />. (if you don't know what it is, leave it at 200.)</p>
  
  
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
  
  <input type="text" disabled bind:value={output} class="font-mono text-center text-3xl py-3" size="30">
  <input type="button" value={copytext} class="border-teal-600 border-2 block my-2 px-2 py-1 text-xl min-w-96 transition-transform active:scale-95" on:mouseleave={() => {copytext = "click here to copy output to clipboard"}} on:mousedown={() => {
    if (output !== "") { navigator.clipboard.writeText(output); copytext = "copied!"}
    else { copytext = "nothing to copy!" }}}
  >

  <p class="text-2xl mb-16">Finally, paste the output into the <b>Anchor</b> parameter in the object setting.</p>
  <p class="w-full border-b-slate-300 border-b-2 mb-8"></p>

  <p class="text-3xl">Alternatively, here are some presets for quick grabbing!</p>
  <p class="text-lg mb-6">(click to copy)</p>

  <ul class="grid grid-cols-3 w-full mb-40">
    {#each presets as preset}
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li class="flex flex-col justify-center items-center bg-white p-4 m-4 transition-all hover:scale-105 active:scale-100 active:bg-teal-50 cursor-pointer select-none" on:mousedown={() => {navigator.clipboard.writeText(preset.value); }}>
        <h1 class="text-2xl">{preset.name}</h1>
        <p class="text-mono text-slate-600">{preset.value}</p>
      </li>
    {/each}
  </ul>
</div>


<footer class="flex flex-col justify-center items-center py-20 bg-slate-200">
  <p>© hexakon 2024</p>
  <p>a super simple sveltekit practice done in half a day.</p>
  <a href="https://github.com/Hexakon/aviutl-bezier" target="_blank">github sauce</a>
</footer>