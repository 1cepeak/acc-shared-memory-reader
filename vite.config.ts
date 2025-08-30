import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    dtsPlugin({
      outDir: 'dist/types',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'acc-shared-memory-reader',
      formats: ['cjs', 'es'],
      fileName: 'reader',
    },
    rollupOptions: {
      external: ['node:events', 'node:module', '@fynnix/node-easy-ipc', 'binutils', 'utf8-bytes'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
