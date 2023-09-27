// #### Import
// remark-usage-ignore-next 2
import stubbedFs from 'mock-fs';
import {projectTypes} from '@form8ion/javascript-core';
import {scaffold} from './lib/index.js';

// remark-usage-ignore-next
stubbedFs();

// #### Execute

(async () => {
  await scaffold({projectRoot: process.cwd(), projectType: projectTypes.PACKAGE});
})();
