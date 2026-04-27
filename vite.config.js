/*import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.intexa.in',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
  ]
}); 
change hua hai
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.intexa.in',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  plugins: [
    react(),

    sitemap({
      hostname: 'https://www.intexa.in',

      routes: [
        '/',
        '/about',
        '/services',
        '/spaces',
        '/process',
        '/pricing',
        '/contact',
      ],
    })

  ]
}) */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.intexa.in',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  plugins: [react()],
})