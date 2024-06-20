import { build } from 'esbuild';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import svgr from 'esbuild-plugin-svgr';
import inlineImage from 'esbuild-plugin-inline-image';
import path from 'path'
const currentScriptPath = import.meta.url;
const currentScriptDirectory = path.dirname(
  new URL(currentScriptPath).pathname
);

build({
  entryPoints: [`${currentScriptDirectory}/module.js`],
  bundle: true,
  outfile: `${currentScriptDirectory}/cosmos-module.js`,
  plugins: [
    svgr(),
    inlineImage(),
    {
      name: 'postcss',
      async setup(build) {
        build.onLoad({ filter: /\.css$/ }, async (args) => {
          const fileContent = await fs.promises.readFile(args.path, 'utf8');
          const { css } = await postcss([tailwindcss, autoprefixer]).process(
            fileContent,
            { from: undefined }
          );
          return { contents: css, loader: 'css' };
        });
      },
    },
  ],
  format: 'esm',
  platform: 'browser',
})
  .catch((e) => {
    console.log(e);
    return process.exit(1);
  })
  .finally(() => console.log('Success.'));
