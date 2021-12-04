const esbuild = require('esbuild');
const glob = require('glob');

const FILES = glob.sync('src/**/*.{ts,tsx,js}', {
  ignore: ['src/utils/mocks/*', 'src/*/*.stories.{ts,tsx,js}', 'src/*/*.test.{ts,tsx,js}'],
});

esbuild
  .build({
    entryPoints: FILES,
    outdir: 'dist',
    splitting: true,
    format: 'esm',
    logLevel: 'info',
    sourcemap: true,
  })
  .catch(() => process.exit(1));