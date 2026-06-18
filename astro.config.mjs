import { defineConfig, passthroughImageService } from 'astro/config';

export default defineConfig({
  // v1 has no images; use a no-op image service so the build does not require
  // the native `sharp` dependency. 站點 URL 之後上線再填。
  image: { service: passthroughImageService() },
});
