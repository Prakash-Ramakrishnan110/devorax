import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/core/index.ts",
    "src/security/index.ts",
    "src/api/index.ts",
    "src/ai/index.ts",
    "src/india/index.ts",
    "src/validation/index.ts",
    "src/async/index.ts"
  ],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false, // Don't minify library code by default so it remains debuggable
  target: "es2022",
});
