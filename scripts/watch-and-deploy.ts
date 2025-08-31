#!/usr/bin/env node

import * as chokidar from 'chokidar';
import { deployChanges } from './claude-deploy';

// Debounce implementation
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const WATCH_PATHS = [
  'app/**/*',
  'components/**/*',
  'lib/**/*',
  'types/**/*',
  'styles/**/*',
  'public/**/*'
];

const debouncedDeploy = debounce(async (path: string) => {
  console.log(`📁 File changed: ${path}`);
  const fileName = path.split('/').pop() || 'file';
  await deployChanges(`Auto-update: ${fileName}`);
}, 5000); // 5 second debounce

console.log('👀 Watching Quotely platform for file changes...');
console.log('📂 Monitoring paths:', WATCH_PATHS.join(', '));

const watcher = chokidar.watch(WATCH_PATHS, {
  ignored: /node_modules|\.git|\.next|\.vercel|\.env/,
  persistent: true,
  ignoreInitial: true
});

watcher
  .on('change', debouncedDeploy)
  .on('add', debouncedDeploy)
  .on('unlink', (path) => {
    console.log(`🗑️  File deleted: ${path}`);
    debouncedDeploy(path);
  });

console.log('✅ File watcher started. Press Ctrl+C to stop.');

process.on('SIGINT', () => {
  console.log('\n👋 Stopping Quotely file watcher...');
  watcher.close();
  process.exit(0);
});