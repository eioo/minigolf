import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import visualizer from 'rollup-plugin-visualizer';
import { PluginOption, defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
      },
    },
    plugins: [
      react(),
      visualizer({
        template: 'treemap',
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: '.build-stats.html',
      }) as PluginOption,
    ],
    server: {
      host: true,
      port: Number(env.VITE_PORT || 8080),
      watch: {
        ignored: ['./src/server/**/*'],
      },
    },
  };
});
