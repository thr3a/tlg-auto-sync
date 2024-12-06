import { existsSync } from 'node:fs';
export function chromePath(): string {
  const macOSPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (existsSync(macOSPath)) {
    return macOSPath;
  }
  return '/opt/hostedtoolcache/setup-chrome/chromium/131.0.6778.87/x64/chrome';
}
