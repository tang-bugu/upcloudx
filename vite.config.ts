import { resolve } from 'node:path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    vue(),
    dts({ rollupTypes: true, tsconfigPath: './tsconfig.json' }),
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: (outputChunk) => outputChunk.fileName === 'index.js',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        vite: resolve(__dirname, 'src/vite/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'dayjs', '@vueuse/core', 'vite'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
});
