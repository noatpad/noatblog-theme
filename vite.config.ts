import { parse } from 'node-html-parser';
import { UserConfig, type PluginOption } from 'vite';

const injectBear = (): PluginOption => ({
  name: 'inject-bear',
  apply: 'serve',
  enforce: 'post',
  configureServer: (server) => {
    // Hack in the actual blog URL into the local environment
    server.middlewares.use('/bear', async (req, res) => {
      // Get the blog page data from the given URL
      const url = new URL(req.url!, 'https://noat.blog');
      const page = await fetch(url);
      const parsed = parse(await page.text());

      // Remove existing styles and scripts in the blog currently
      for (const s of parsed.querySelectorAll('style, footer script')) s.remove();

      // Replace all links in the page to proxy it into the local environment
      for (const a of parsed.querySelectorAll('a')) {
        const href = a.getAttribute('href');
        if (href?.startsWith('/')) a.setAttribute('href', `/bear${href}`);
      }

      // Inject vite script to maintain hot reloading
      parsed.querySelector('head')?.insertAdjacentHTML(
        'beforeend',
        '<script type="module" src="/@vite/client"></script>\n\
        <link rel="stylesheet" href="/style.scss" />'
      );

      // Add a link back to the main local page to the navbar
      parsed.querySelector('nav > p')?.insertAdjacentHTML(
        'afterbegin',
        '<a href="/" style="font-style: italic; font-weight: bold;">< localhost</a>'
      )

      // Inject the development script
      parsed.querySelector('footer')?.insertAdjacentHTML(
        'afterbegin',
        '<script type="module" src="/noatblog.ts"></script>'
      )

      const text = parsed.toString();
      res.writeHead(200);
      res.end(text);
    })
  }
});

export default {
  appType: "mpa",
  plugins: [injectBear()],
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' }
    }
  },
  build: {
    minify: true,
    cssMinify: true,
    rollupOptions: {
      input: {
        style: './style.scss',
        noatblog: './noatblog.ts'
      }
    }
  },
  server: { open: true }
} satisfies UserConfig;
