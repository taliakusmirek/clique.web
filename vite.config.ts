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
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.glb', '**/*.obj', '**/*.mtl'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          const extType = assetInfo.name.split('.').pop()?.toLowerCase();
          if (extType === 'glb' || extType === 'obj' || extType === 'mtl') {
            // Preserve original names for 3D model files
            return `models/[name][extname]`;
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
