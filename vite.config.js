// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { createRequire } from 'module';

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     host: '0.0.0.0',
//     port: 4004,
//     proxy: {
//       '/api': 'http://10.69.5.70:5000',
//     },
//   },
// });          

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  optimizeDeps: {
    include: [
      '@react-three/drei',
      '@react-three/fiber',
      'three',
    ],
  },

  server: {
    host: '0.0.0.0',
    port: 4004,

    proxy: {
      '/api': 'http://10.69.5.70:5000',
    },
  },
})