import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('vite is installed', async function () {
  const {devDependencies} = this.scaffoldResult;

  assert.include(devDependencies, 'vite');
});
