import { defineConfig } from 'astro/config';
import lit from '@astrojs/lit';

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    },
    lit())],
  vite: {},
  server: {
    port: process.env.PORT || 3000,
  },
});
