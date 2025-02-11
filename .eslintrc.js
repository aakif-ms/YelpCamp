module.exports = {
    env: {
        es2022: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended', // Integrates Prettier with ESLint
    ],
    parserOptions: {
        ecmaVersion: 12, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    rules: {
        // You can override/add specific rules settings here
        'no-unused-vars': 'warn',
    },
};
