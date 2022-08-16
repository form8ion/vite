import deepmerge from 'deepmerge';

import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';

import * as configScaffolder from './config/scaffolder';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(configScaffolder, 'default');
    sandbox.stub(deepmerge, 'all');
  });

  teardown(() => sandbox.restore());

  test('that vite is configured', async () => {
    const projectRoot = any.string();
    const projectType = any.word();
    const mergedResults = any.simpleObject();
    const configResults = any.simpleObject();
    configScaffolder.default.withArgs({projectRoot, projectType}).resolves(configResults);
    deepmerge.all.withArgs([
      {
        devDependencies: ['vite'],
        scripts: {
          'build:js': 'vite build',
          watch: 'run-s \'build:js -- --watch\''
        }
      },
      configResults
    ]).returns(mergedResults);

    const results = await scaffold({projectRoot, projectType});

    assert.equal(results, mergedResults);
  });
});
