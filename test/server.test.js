import { test } from 'node:test';
import assert from 'node:assert/strict';
import { config } from '../src/config.js';

test('config reads from environment', () => {
  assert.equal(typeof config.env, 'string');
  assert.equal(typeof config.greeting, 'string');
});

test('build metadata is set', () => {
  assert.ok(config.version);
  assert.ok(config.commitSha);
});
