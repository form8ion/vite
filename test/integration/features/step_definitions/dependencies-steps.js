import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('vite is installed', async function () {
  const {dependencies: {javascript: {development}}} = this.scaffoldResult;

  assert.include(development, 'vite');
});
