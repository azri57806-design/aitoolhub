import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// 双部署模式：
// - CloudStudio（默认）：根路径部署，base 为 '/'
// - GitHub Pages：设 DEPLOY_MODE=github，base 为 '/aitoolhub'
const isGitHub = process.env.DEPLOY_MODE === 'github';

export default defineConfig({
  site: isGitHub ? 'https://azri57806-design.github.io' : undefined,
  base: isGitHub ? '/aitoolhub' : '/',
  integrations: [tailwind()],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
