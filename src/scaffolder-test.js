import {assert} from 'chai';

import scaffold from './scaffolder';

suite('scaffolder', () => {
  test('that vite is configured', async () => {
    const results = await scaffold({});

    assert.deepEqual(results.devDependencies, ['vite']);
  });
});
