import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

import {After, Given, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

const __dirname = dirname(fileURLToPath(import.meta.url));            // eslint-disable-line no-underscore-dangle
const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules'));

After(function () {
  stubbedFs.restore();
});

Given('the project-type is {string}', async function (projectType) {
  this.projectType = projectType;
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = await import('@form8ion/vite');

  stubbedFs({
    node_modules: stubbedNodeModules
  });

  this.scaffoldResult = await scaffold({projectRoot: process.cwd(), projectType: this.projectType});
});
