import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { name } from './package.json'
import tailwindcss from '@tailwindcss/vite'

const app = async () => {
  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
      dts({
        insertTypesEntry: true,
        outDir: 'dist',
        exclude: ['**/*.stories.tsx']
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './lib')
      }
    },
    build: {
      outDir: 'dist',
      minify: true,
      cssCodeSplit: false,
      lib: {
        entry: path.resolve(__dirname, 'lib/index.ts'),
        name: name.match(/[^/]+$/)?.[0] ?? name,
        formats: ['es', 'umd'],
        fileName: (format) => `${name.match(/[^/]+$/)?.[0] ?? name}.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom', 'tailwindcss'],
        output: {
          assetFileNames: (assetInfo) => {
            const originals = assetInfo.originalFileNames ?? []
            const names = assetInfo.names ?? []
            const all = [...originals, ...names]
            const isCss = all.some((n) => n?.toString().endsWith('.css'))
            return isCss ? 'style.css' : 'assets/[name][extname]'
          },
          globals: {
            react: 'React',
            'react/jsx-runtime': 'react/jsx-runtime',
            'react-dom': 'ReactDOM',
            tailwindcss: 'tailwindcss'
          }
        }
      }
    }
  })
}
export default app
