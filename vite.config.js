import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// "preview" erzeugt einen statischen Build mit relativen Pfaden und Memory-Routing,
// lauffähig ohne Server (z. B. als Vorschau-Link).
export default defineConfig(({ mode }) => ({
  base: mode === 'preview' ? './' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: { '/api': 'http://localhost:8787' },
  },
}))
