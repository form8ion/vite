import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('basic config is defined', async function () {
  const {dependencies: {javascript: {development}}} = this.scaffoldResult;
  const configContents = await fs.readFile(`${process.cwd()}/vite.config.js`, 'utf-8');

  assert.notInclude(development, 'rollup-plugin-auto-external');
  assert.equal(
    configContents,
    `import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    sourcemap: true
  }
});`
  );
});

Then('library mode is enabled', async function () {
  const {dependencies: {javascript: {development}}} = this.scaffoldResult;
  const configContents = await fs.readFile(`${process.cwd()}/vite.config.js`, 'utf-8');

  assert.include(development, 'rollup-plugin-auto-external');
  assert.equal(
    configContents,
    `import {defineConfig} from 'vite';
import autoExternal from 'rollup-plugin-auto-external';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
    },
    rollupOptions: {
      plugins: [autoExternal()]
    }
  }
});`
  );
});
