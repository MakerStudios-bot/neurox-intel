// Load polyfills before importing anything else
import { File, FormData } from 'undici';

if (!globalThis.File) {
  globalThis.File = File;
}

if (!globalThis.FormData) {
  globalThis.FormData = FormData;
}

export { File, FormData };
