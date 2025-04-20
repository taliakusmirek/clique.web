import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { imagetools } from 'vite-imagetools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: 'webp',
        quality: '80',
        w: '1920',
      }),
    }),
    {
      name: 'obj-loader',
      transform(code, id) {
        if (id.endsWith('.obj')) {
          return `export default ${JSON.stringify(code)}`;
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@assets': path.resolve(process.cwd(), './src/assets'),
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.obj', '**/*.mtl'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          // Special handling for 3D model files
          if (assetInfo.name.match(/\.(glb|gltf|obj|mtl)$/)) {
            // Ensure files from public/models go to the correct location
            const fileName = assetInfo.name.replace(/^public[\\/]/, '');
            return fileName;
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    copyPublicDir: true,
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  base: '/',
  publicDir: 'public',
})
