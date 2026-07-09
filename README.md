# Daniel's Homepage

This repo contains all the source code for my personal portfolio.

## Live Site

Live website link: https://danielvm.dev

## Technology Stack

- [Typescript](https://typescriptlang.org) - Javascript with better type inference
- [Svelte](https://svelte.dev) - UI component framework
- [SvelteKit](https://svelte.dev) - A framework utilities for client-side routing, server-side rendering, and data fetching
- [TailwindCSS](https://tailwindcss.com) - CSS library for optimized inline styles
- [Vite](http://vite.dev) - Build tool for frontend applications
- [Mdsvex](https://mdsvex.pngwn.io/) - Svelte Plugin for parsing Markdown as Svelte Components
- [Shiki](https://shiki.style/) - Syntax Highlighter for codeblocks on markdown

## Unique Features

The contact page is served through a custom-made web server in Go I created to validate
CloudFlare's Turnstile token sent through the `/contact` form. Additionally, I'm
using Mailgun to send emails through my VPS.

## License

MIT License - Feel free to fork or use this template for your own portfolio. Just
make sure you replace your my `resume.pdf` file with your own in the static folder.

---

Built with ❤️ by Daniel
