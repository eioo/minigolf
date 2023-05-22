import reactRefresh from '@vitejs/plugin-react-refresh';
import visualizer from 'rollup-plugin-visualizer';
import { PluginOption, defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    visualizer({
      template: 'treemap',
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: '.build-stats.html',
    }) as PluginOption,
  ],
  server: {
    watch: {
      ignored: ['./src/server/**/*'],
    },
  },
});
