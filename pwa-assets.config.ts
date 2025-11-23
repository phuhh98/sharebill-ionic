import {
  defineConfig,
  minimal2023Preset as preset,
  Preset,
} from '@vite-pwa/assets-generator/config';

const customPreset: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [
      [48, 'favicon-48x48.ico'],
      [64, 'favicon.ico'],
    ],
  },
  maskable: {
    sizes: [512],
  },
  apple: {
    sizes: [180],
  },
};

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: customPreset,
  images: ['public/app-icon.png'],
});
