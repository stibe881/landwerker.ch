import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Modi:
//   (Standard)  eigener Server unter der Domain-Wurzel, mit Kontakt-API
//   preview     statischer Build mit relativen Pfaden und Memory-Routing (Vorschau-Link)
//   pages       GitHub Pages unter https://<user>.github.io/landwerker.ch/ (VITE_BASE überschreibt den Pfad,
//               z. B. VITE_BASE=/ für eine eigene Domain)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = mode === 'preview' ? './' : mode === 'pages' ? env.VITE_BASE || '/landwerker.ch/' : '/'
  return {
    base,
    plugins: [react(), tailwindcss()],
    server: {
      proxy: { '/api': 'http://localhost:8787' },
    },
  }
})
