import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.js'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});