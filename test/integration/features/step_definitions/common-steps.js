import {resolve} from 'path';
import {After, Given, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules'));

After(function () {
  stubbedFs.restore();
});

Given('the project-type is {string}', async function (projectType) {
  this.projectType = projectType;
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = require('@form8ion/vite');

  stubbedFs({
    node_modules: stubbedNodeModules
  });

  this.scaffoldResult = await scaffold({projectRoot: process.cwd(), projectType: this.projectType});
});
