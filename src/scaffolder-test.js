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
  });

  teardown(() => sandbox.restore());

  test('that vite is configured', async () => {
    const projectRoot = any.string();

    const {devDependencies, scripts} = await scaffold({projectRoot});

    assert.deepEqual(devDependencies, ['vite']);
    assert.deepEqual(
      scripts,
      {
        'build:js': 'vite build',
        watch: 'run-s \'build:js -- --watch\''
      }
    );
    assert.calledWith(configScaffolder.default, {projectRoot});
  });
});
