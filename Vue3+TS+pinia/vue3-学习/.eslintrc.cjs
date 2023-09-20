module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        node: true,
        jest: true,
        "vue/setup-compiler-macros": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
        'plugins:prettier/recommended'
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    parser: 'vue-eslint-parser',
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module",
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true
        }
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        'no-var': 'error',
        "no-multiple-empty-lines": ['warn', {"max": 2}],

    }
}
