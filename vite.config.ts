import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

const githubPagesAssetPaths = [
  '/product1.jpg',
  '/product2.jpg',
  '/product_3.jpg',
  '/product_4.jpg',
  '/product_5.jpg',
  '/product_6.jpg',
  '/founder.jpg',
  '/logo.jpg',
];

const githubPagesAssets: Plugin = {
  name: 'github-pages-public-assets',
  apply: 'build',
  transform(code, id) {
    if (!id.includes('/src/')) return null;

    let updated = code;
    for (const assetPath of githubPagesAssetPaths) {
      const relativePath = assetPath.slice(1);
      updated = updated
        .replaceAll(`'${assetPath}'`, `import.meta.env.BASE_URL + '${relativePath}'`)
        .replaceAll(`"${assetPath}"`, `import.meta.env.BASE_URL + "${relativePath}"`);
    }

    updated = updated.replaceAll('`/frames/frame_', '`${import.meta.env.BASE_URL}frames/frame_');
    return updated === code ? null : {code: updated, map: null};
  },
};

export default defineConfig(() => {
  return {
    base: '/Origin-Fragrance/',
    plugins: [react(), tailwindcss(), githubPagesAssets],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
