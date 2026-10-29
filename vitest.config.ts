import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vitest/config';

/** Next.js turns image imports into objects with a size. Tests only need the shape. */
const staticImages: Plugin = {
  name: 'static-images',
  load(id) {
    if (/\.(png|jpe?g|webp|avif|gif)$/.test(id)) {
      return `export default { src: ${JSON.stringify(id)}, width: 1600, height: 1000, blurDataURL: '' };`;
    }
    return null;
  },
};

export default defineConfig({
  plugins: [staticImages],
  resolve: {
    alias: {
      '@config': fileURLToPath(new URL('./config/index.ts', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
