import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('basic config is defined', async function () {
  const {devDependencies} = this.scaffoldResult;
  const configContents = await fs.readFile(`${process.cwd()}/vite.config.js`, 'utf-8');

  assert.notInclude(devDependencies, 'rollup-plugin-auto-external');
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
  const {devDependencies} = this.scaffoldResult;
  const configContents = await fs.readFile(`${process.cwd()}/vite.config.js`, 'utf-8');

  assert.include(devDependencies, 'rollup-plugin-auto-external');
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
