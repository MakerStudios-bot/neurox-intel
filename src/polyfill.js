// Polyfill File and FormData for undici compatibility
if (!globalThis.File) {
  globalThis.File = class File {
    constructor(bits, filename, options = {}) {
      this.bits = bits;
      this.filename = filename;
      this.type = options.type || '';
      this.lastModified = options.lastModified || Date.now();
      this.size = bits ? bits.toString().length : 0;
    }
  };
}

if (!globalThis.FormData) {
  globalThis.FormData = class FormData {
    constructor() {
      this.entries = [];
    }
    append(key, value, filename) {
      this.entries.push({ key, value, filename });
    }
  };
}
