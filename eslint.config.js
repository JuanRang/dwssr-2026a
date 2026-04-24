import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

const { browser, node } = globals;

export default defineConfig([
  // 1. Ignorar dependencias y builds
  {
    ignores: ["node_modules/**", "dist/**"]
  },

  // 2. Backend
  {
    files: ["server/**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...node }
    }
  },

  // 3. Frontend
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...browser }
    }
  }
]);