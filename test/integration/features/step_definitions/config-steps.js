import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('basic config is defined', async function () {
  const configContents = await fs.readFile(`${process.cwd()}/vite.config.js`, 'utf-8');

  assert.equal(
    configContents,
    `import {defineConfig} from 'vite';

export default defineConfig({})`
  );
});

Then('library mode is enabled', async function () {
  const configContents = JSON.parse(await fs.readFile(`${process.cwd()}/vite.config.js`, 'utf-8'));

  assert.isDefined(configContents.build.lib);
});
