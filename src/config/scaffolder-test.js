import {promises as fs} from 'fs';
import {projectTypes} from '@form8ion/javascript-core';

import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import scaffoldConfig from './scaffolder';

suite('config scaffolder', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'writeFile');
  });

  teardown(() => sandbox.restore());

  test('that the library mode is enabled for a package project-type', async () => {
    const {devDependencies} = await scaffoldConfig({projectRoot, projectType: projectTypes.PACKAGE});

    assert.calledWith(
      fs.writeFile,
      `${projectRoot}/vite.config.js`,
      `import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    sourcemap: true
  }
});`
    );
    assert.deepEqual(devDependencies, ['rollup-plugin-auto-external']);
  });

  test('that the library mode is not enabled for other project-types', async () => {
    const {devDependencies} = await scaffoldConfig({projectRoot, projectType: any.word()});

    assert.calledWith(
      fs.writeFile,
      `${projectRoot}/vite.config.js`,
      `import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    sourcemap: true
  }
});`
    );
    assert.deepEqual(devDependencies, []);
  });
});
