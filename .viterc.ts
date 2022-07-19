import {defineConfig} from '@micra/vite-config/library';
import {cwd} from '@micra/vite-config/utilities/cwd';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        '@micra/core',
        '@micra/router',
        '@micra/error',
        '@micra/event-emitter',
        '@micra/request-handler/utilities',
        'history',
      ],
      input: {
        index: cwd('index.ts'),
        'ServiceProvider.server': cwd('./ServiceProvider.server.ts'),
        'ServiceProvider.web': cwd('./ServiceProvider.web.ts'),
      },
    },
  },
});
