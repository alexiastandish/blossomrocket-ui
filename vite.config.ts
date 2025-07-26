import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "node:path";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    outDir: "dist",
    rollupOptions: {
      // Exclude peer deps
      external: ["react", "react-dom"],
      output: {
        preserveModules: true, // ✅ enables code splitting
        preserveModulesRoot: "src", // ✅ optional: keeps output clean
        entryFileNames: "[name].js", // ✅ better output names
      },
    },
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import dts from "vite-plugin-dts";
// import path from "node:path";
// import eslint from "vite-plugin-eslint";
// import { fileURLToPath } from "node:url";
// import { sync as globSync } from "glob";

// const dir =
//   typeof __dirname !== "undefined"
//     ? __dirname
//     : path.dirname(fileURLToPath(import.meta.url));

// export default defineConfig({
//   plugins: [
//     react(),
//     eslint(),
//     dts({
//       include: ["lib"],
//       exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
//       tsconfigPath: "./tsconfig.json",
//     }),
//   ],
//   build: {
//     lib: {
//       entry: path.resolve(dir, "lib/index.ts"),
//       name: "ui",
//       fileName: (format) => `index.${format}.js`,
//       formats: ["es", "cjs"],
//     },
//     outputDir: "dist",
//     rollupOptions: {
//       external: ["react", "react-dom", "react/jsx-runtime"],
//       input: Object.fromEntries(
//         globSync("lib/**/*.{ts,tsx}", {
//           ignore: ["**/*.stories.tsx", "**/*.test.tsx"],
//         }).map((file) => [
//           path.relative(
//             "lib",
//             file.slice(0, file.length - path.extname(file).length)
//           ),
//           fileURLToPath(new URL(file, import.meta.url)),
//         ])
//       ),
//       output: {
//         external: ["react", "react-dom"],
//         globals: {
//           react: "React",
//           "react-dom": "ReactDOM",
//         },
//         entryFileNames: "[name].js",
//         assetFileNames: "assets/[name][extname]",
//       },
//     },
//     sourcemap: true,
//   },
// });

// // // <reference types="vitest/config" />
// // import { defineConfig } from "vite";
// // import { resolve, extname, relative, dirname } from "node:path";

// // import react from "@vitejs/plugin-react";
// // import dts from "vite-plugin-dts";
// // import { peerDependencies } from "./package.json";
// // import tailwindcss from "@tailwindcss/vite";

// // import { fileURLToPath } from "node:url";
// // import { glob } from "glob";
// // // import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
// // const directory =
// //   typeof __dirname !== "undefined"
// //     ? __dirname
// //     : dirname(fileURLToPath(import.meta.url));

// // // More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
// // export default defineConfig({
// //   plugins: [
// //     react(),
// //     tailwindcss(),
// //     dts({
// //       include: ["lib"],
// //     }),
// //   ],
// //   build: {
// //     copyPublicDir: false,
// //     lib: {
// //       entry: resolve(directory, "lib/index.ts"),
// //       formats: ["es"],
// //     },
// //     rollupOptions: {
// //       external: ["react", "react/jsx-runtime", "react-dom"],
// //       input: Object.fromEntries(
// //         // https://rollupjs.org/configuration-options/#input
// //         glob
// //           .sync("lib/**/*.{ts,tsx}", {
// //             ignore: ["lib/**/*.stories.tsx"],
// //           })
// //           .map((file) => [
// //             relative("lib", file.slice(0, file.length - extname(file).length)),
// //             fileURLToPath(new URL(file, import.meta.url)),
// //           ])
// //       ),
// //       output: {
// //         globals: { react: "React", "react-dom": "ReactDOM" },
// //         assetFileNames: "assets/[name][extname]",
// //         entryFileNames: "[name].js",
// //       },
// //     },
// //   },
// // });
