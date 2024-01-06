# aviutl-bezier

translates CSS bezier functions to the format used by the BezierTrack plugin for [AviUtl](https://www.videohelp.com/software/AviUtl), a ridiculously lightweight and gratis japanese video editor with history dating as far back as the 90s.

use the tool at [bezier.pages.dev](https://bezier.pages.dev).

a very simple first sveltekit app to learn the ropes of several essential skills:

- props usage (`/src/lib/svg/DownArrow.svelte`)
- using `#if` to selectively display certain elements
- using `#each` to display a list of items
- basic tailwind syntax (truly revolutionary, i'm a fan now)
  - dark theme application
  - basic responsive design
- basic deploying (in this case Cloudflare Pages)
- localstorage (to remember dark theme) (it works, but only when placed in svelte:head so it applies the class before the page renders. might not work for other things?)

things i should probably focus on next:

- stores
- timers (setInterval)
- sse?