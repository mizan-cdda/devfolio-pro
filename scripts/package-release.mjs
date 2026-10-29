#!/usr/bin/env node
/**
 * Builds the buyer download: release/devfolio-pro-<version>.zip
 *
 * Uses `git archive`, so only committed files are included and everything marked `export-ignore`
 * in .gitattributes (the marketing folder and this script) is left out. Commit your changes first.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, statSync } from 'node:fs';

const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const status = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim();
if (status) {
  console.error('Uncommitted changes found. Commit or stash them so the package matches the repository:\n' + status);
  process.exit(1);
}

mkdirSync('release', { recursive: true });
const file = `release/devfolio-pro-${version}.zip`;
execFileSync('git', ['archive', '--format=zip', `--prefix=devfolio-pro/`, '-o', file, 'HEAD'], { stdio: 'inherit' });

const sizeKb = Math.round(statSync(file).size / 1024);
console.log(`Created ${file} (${sizeKb} KB). Unzip it into a new folder and run the quick start before uploading.`);
