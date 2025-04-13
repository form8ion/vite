import deepmerge from 'deepmerge';

import any from '@travi/any';
import {when} from 'vitest-when';
import {afterEach, describe, it, expect, vi} from 'vitest';

import scaffoldConfig from './config/scaffolder.js';
import scaffold from './scaffolder.js';

vi.mock('deepmerge');
vi.mock('./config/scaffolder.js');

describe('scaffolder', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should configure vite', async () => {
    const projectRoot = any.string();
    const projectType = any.word();
    const mergedResults = any.simpleObject();
    const configResults = any.simpleObject();
    when(scaffoldConfig).calledWith({projectRoot, projectType}).thenResolve(configResults);
    when(deepmerge.all).calledWith([
      {
        dependencies: {javascript: {development: ['vite']}},
        scripts: {
          'build:js': 'vite build',
          watch: 'run-s \'build:js -- --watch\''
        }
      },
      configResults
    ]).thenReturn(mergedResults);

    const results = await scaffold({projectRoot, projectType});

    expect(results).toEqual(mergedResults);
  });
});
