// import { defineConfig } from "eslint/config";
// import globals from "globals";
// import js from "@eslint/js";


// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"] },
//   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
// ]);


import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node, // ✅ This tells ESLint you are using Node.js
    },
    plugins: { js },
    extends: ["plugin:@eslint/js/recommended"], // ✅ Correct extend path
  },
]);
