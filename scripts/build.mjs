import { build } from 'esbuild';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import extra from 'fs-extra';
import path from 'path';
import svgr from 'esbuild-plugin-svgr';
import inlineImage from 'esbuild-plugin-inline-image';
import Async from '../hyper-async.js';
import { existsSync } from 'fs';
import { runCommand } from './util.mjs';
const { Rejected, Resolved, fromPromise } = Async;

/**
 * @author @jshaw-ar
 * @param {path.PlatformPath} path
 * @param {extra.promises} promises
 * @param {runCommand} runCommand
 */
function main(path, promises, runCommand) {
  /**
   * @param {string} project
   * @param {string} pkg
   * @returns {void}
   */
  return (project, pkg) =>
    Async.of({ project, pkg, path })
      .chain(validate)
      .chain((input) =>
        fromPromise(deleteDirectoryContents)({ ...input, promises })
      )
      .map((input) => buildTypes({ ...input, runCommand, extra }))
      .chain(fromPromise(copyTypes))
      .chain((input) => fromPromise(copyPackageJson)({ ...input }))
      .chain(fromPromise(runBuild))
      .fork(console.log, console.log);
}

/**
 * @typedef {Object} ValidateInput
 * @property {string} path - The path package.
 * @param {string} project - The nx project.
 * @param {string} package - The process.env.PACKAGE variable.
 */
/**
 * @typedef {Object} ValidatedOutput
 * @property {string} directory - The path to the project directory.
 * @property {string} package_dist - The path to the distribution directory within the package.
 * @property {string} root_dist - The path to the root distribution directory.
 */
/**
 * @description Validates the environment setup and constructs paths based on the project configuration.
 * @param {ValidateInput} input - The path module from Node.js.
 * @returns {ValidatedOutput}
 *
 */
function validate({ project, pkg, path }) {
  if (!project && !pkg) {
    console.log('here', process.env.PACKAGE);
    return Rejected('Please specify a folder.');
  }

  const currentScriptPath = import.meta.url;
  const currentScriptDirectory = path.dirname(
    new URL(currentScriptPath).pathname
  );
  const clone = project || pkg;
  const directory = path.join(
    currentScriptDirectory,
    '..',
    `packages/${clone}`
  );
  if (!existsSync(directory)) {
    return Rejected(`${clone} doesn't exist.`);
  }
  const package_dist = path.join(
    currentScriptDirectory,
    '..',
    `packages/${clone}/dist`
  );
  const root_dist = path.join(
    currentScriptDirectory,
    '..',
    `dist/packages/${clone}`
  );

  return Resolved({
    directory,
    package_dist,
    root_dist,
    path,
  });
}

async function runBuild({ directory, root_dist, promises }) {
  return build({
    entryPoints: [`${directory}/src/App.jsx`],
    bundle: true,
    outfile: `${root_dist}/app.js`,
    external: ['react', 'react-dom'],
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    plugins: [
      svgr(),
      inlineImage(),
      {
        name: 'postcss',
        async setup(build) {
          build.onLoad({ filter: /\.css$/ }, async (args) => {
            const fileContent = await promises.readFile(args.path, 'utf8');
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
  });
}

/**
 * @param {Object} input
 * @param {extra.promises} input.promises
 * @param {path} input.path
 * @param {existsSync} input.existSync
 * @param {runCommand} input.runCommand
 * @param {string} input.root_dist
 * @param {string} input.package_dist
 * @param {string} input.directory
 * @param {string} input.project
 */
function buildTypes(input) {
  const { directory, project } = input;

  console.log(`Running tsc in library: ${project}`);
  runCommand('npx tsc', `${directory}`);
  return input;
}

/**
 * @param {Object} input
 * @param {extra.promises} promises
 * @param {string} root_dist
 * @param {string} package_dist
 * @param {string} directory
 */
async function deleteDirectoryContents(input) {
  const { root_dist, promises } = input;
  try {
    const entries = await promises.readdir(root_dist, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      const fullPath = path.join(root_dist, entry.name);
      if (entry.isDirectory()) {
        await extra.remove(fullPath); // This will recursively delete the directory and its contents
      } else {
        await extra.promises.unlink(fullPath); // This will delete the file
      }
    }
    return input;
  } catch (error) {
    if (error?.message?.includes('ENOENT: no such')) return input;
    console.error(`Error deleting contents of directory ${root_dist}:`, error);
    throw error;
  }
}

/**
 * @param {Object} input
 * @param {extra.promises} promises
 * @param {path} path
 * @param {string} root_dist
 * @param {string} package_dist
 * @param {string} directory
 */
async function copyPackageJson(input) {
  const { directory, root_dist, path } = input;
  try {
    // Read and update the package.json
    const packageJsonPath = path.join(directory, 'package.json');
    const packageJson = JSON.parse(
      await extra.promises.readFile(packageJsonPath, 'utf8')
    );

    // Update package.json fields
    packageJson.module = 'app.js';
    packageJson.main = 'app.js';
    packageJson.types = 'App.d.ts';

    // Ensure the destination directory exists
    try {
      await extra.ensureDir(root_dist);
    } catch (error) {
      console.log(`Directory already exists: ${root_dist}`);
    }

    const newPackageJsonPath = path.join(root_dist, 'package.json');

    // Write the updated package.json file
    await extra.promises.writeFile(
      newPackageJsonPath,
      JSON.stringify(packageJson, null, 2)
    );
    console.log(`File ${newPackageJsonPath} has been written successfully.`);
    return input;
  } catch (error) {
    console.error('Error copying package.json:', error);
  }
}

/**
 * @param {Object} input
 * @param {extra.promises} input.promises
 * @param {path} input.path
 * @param {existsSync} input.existSync
 * @param {runCommand} input.runCommand
 * @param {string} input.root_dist
 * @param {string} input.package_dist
 * @param {string} input.directory
 * @param {string} input.project
 */
async function copyTypes(input) {
  try {
    console.log(input.root_dist);
    console.log(input.package_dist);
    const { root_dist, package_dist, promises, path, extra } = input;
    await promises.mkdir(root_dist, { recursive: true });

    // Copy the contents of the source directory to the destination directory
    await copyDirectory(package_dist, `${root_dist}/`, promises, path, extra);

    console.log('All files and directories copied successfully.');
    return input;
  } catch (error) {
    console.error('Error copying files and directories:', error);
  }
}

async function copyDirectory(srcDir, destDir, promises, path, extra) {
  try {
    // Read the contents of the source directory
    const entries = await promises.readdir(srcDir, {
      withFileTypes: true,
    });

    // Iterate over each entry in the source directory
    for (const entry of entries) {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);

      if (entry.isDirectory()) {
        await extra.ensureDir(destPath);
        // Recursively copy the directory
        await copyDirectory(srcPath, destPath, promises, path, extra);
      } else {
        // Copy the file
        await promises.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error('Error copying directory:', error);
  }
}

main(path, extra.promises)(
  process.env.NX_TASK_TARGET_PROJECT,
  process.env.PACKAGE
);
