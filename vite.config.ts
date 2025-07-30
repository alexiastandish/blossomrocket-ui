import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig, type UserConfigExport } from 'vite'
import dts from 'vite-plugin-dts'
import { name } from './package.json'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const app = async (): UserConfigExport => {
  const formattedName = name.match(/[^/]+$/)?.[0] ?? name

  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, 'lib/index.css'),
            dest: './'
          }
        ]
      }),
      dts({
        insertTypesEntry: true
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './lib')
      }
    },
    build: {
      minify: true,
      lib: {
        entry: path.resolve(__dirname, 'lib/index.ts'),
        name: formattedName,
        formats: ['es', 'umd'],
        fileName: (format) => `${formattedName}.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom', 'tailwindcss'],
        output: {
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

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import dts from "vite-plugin-dts";
// import path from "node:path";

// export default defineConfig({
//   plugins: [
//     react(),
//     // cssInjectedByJsPlugin(),
//     dts({
//       include: ["lib"],
//       exclude: ["**/*.stories.tsx", "**/*.test.tsx", "lib/utils/**"],
//     }),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./lib"),
//     },
//   },
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, "lib/index.ts"),
//       formats: ["es"],
//     },
//     outDir: "dist",
//     rollupOptions: {
//       external: ["react", "react-dom"],
//       output: {
//         preserveModules: true,
//         preserveModulesRoot: "lib",
//         entryFileNames: "[name].js",
//       },
//     },
//   },
// });
