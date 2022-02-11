import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('appropriate scripts are defined', async function () {
  const {scripts} = this.scaffoldResult;

  assert.deepEqual(
    scripts,
    {
      'build:js': 'vite build',
      watch: 'run-s \'build:js -- --watch\''
    }
  );
});
