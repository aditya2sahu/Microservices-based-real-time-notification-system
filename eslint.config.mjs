import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    env: {
      browser: true,
      node: true
    }
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    }
  },
  {
    languageOptions:
    {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
];