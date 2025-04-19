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
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
      external: ['*.glb', '*.obj', '*.mtl'],
    },
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
