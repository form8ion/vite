import {promises as fs} from 'fs';

import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import scaffoldConfig from './scaffolder';

suite('config scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'writeFile');
  });

  teardown(() => sandbox.restore());

  test('that the library mode is enabled for a package project-type', async () => {
    const projectRoot = any.string();

    await scaffoldConfig({projectRoot});

    assert.calledWith(
      fs.writeFile,
      `${projectRoot}/vite.config.js`,
      `import {defineConfig} from 'vite';

export default defineConfig({})`
    );
  });
});
