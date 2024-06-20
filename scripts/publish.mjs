#!/usr/bin/env node

import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { runCommand } from './util.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the directory path from the command line arguments
const library = process.env.NX_TASK_TARGET_PROJECT || process.env.PACKAGE;

if (!library) {
  console.error('Error: No directory path provided.');
  process.exit(1);
}

// Resolve the absolute path of the directory
const absolutePath = resolve(__dirname, `../dist/packages/${library}`);
console.log('absolutePath', absolutePath);

// Function to execute a command and return a promise

// Run npm pack and npm publish
const run = async () => {
  try {
    console.log(`Running npm pack in directory: ${absolutePath}`);
    runCommand('npm pack', absolutePath);

    console.log(`Running npm publish in directory: ${absolutePath}`);
    runCommand('npm publish', absolutePath);
  } catch (error) {
    console.error('Failed to execute npm pack and npm publish.', error);
    process.exit();
  }
};

run();
