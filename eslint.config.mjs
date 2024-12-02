import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,jsx}'] },
    {
        ignores: ['dist/*', 'node_modules/*', 'webpack.config.js'],
    },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    eslintConfigPrettier,
];
