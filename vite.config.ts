import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'vite-core-web-vitals-optimizer',
        transformIndexHtml(html: string) {
          // 1. Ensure any non-module third-party scripts have defer or async
          let transformed = html.replace(
            /<script\b(?![^>]*(?:\bdefer\b|\basync\b|\btype\s*=\s*["']module["']))([^>]*src\s*=\s*["'][^"']+["'][^>]*)>/gi,
            '<script defer $1>'
          );

          // 2. Ensure non-hero images have loading="lazy" and decoding="async"
          transformed = transformed.replace(/<img\b([^>]*)>/gi, (_match, attrs) => {
            let updated = attrs;
            if (!/loading\s*=/i.test(updated) && !/hero|portrait/i.test(updated)) {
              updated += ' loading="lazy"';
            }
            if (!/decoding\s*=/i.test(updated)) {
              updated += ' decoding="async"';
            }
            return `<img${updated}>`;
          });

          return transformed;
        },
      },
      {
        name: 'vite-cache-headers-plugin',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url || '';
            // Cache static assets (images, fonts, scripts, styles, media)
            if (url.match(/\.(png|jpg|jpeg|webp|avif|svg|woff2?|ttf|css|js|mp4|webm|ico)$/i) || url.includes('/assets/')) {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            } else if (url === '/' || url.endsWith('.html')) {
              res.setHeader('Cache-Control', 'no-cache, must-revalidate');
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      minify: 'esbuild' as const,
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/motion/') || id.includes('node_modules/framer-motion/')) {
              return 'vendor-motion';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
