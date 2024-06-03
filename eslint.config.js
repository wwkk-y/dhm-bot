import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: { globals: globals.browser },
    rules: { // 关闭 import 检验
      "import/no-unresolved": [
         2, 
         { "caseSensitive": false }
      ]
   }
  },
  pluginJs.configs.recommended,

];