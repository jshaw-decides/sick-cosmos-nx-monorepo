#!/usr/bin/env node
import { execSync } from 'child_process';

/**
 * Runs a command in a specified directory.
 * @param {string} command - The command to run.
 * @param {string} directory - The directory in which to run the command.
 */
export const runCommand = (command, directory) => {
  execSync(`(cd ${directory} && ${command})`, { stdio: 'inherit' });
};
