import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.*'],
  },
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  {
    rules: {
      'no-console': 'warn',
      'vue/multi-word-component-names': 'off',
    },
  },
];
