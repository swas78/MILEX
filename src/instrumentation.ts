export function register() {
  if (typeof globalThis !== 'undefined') {
    if (typeof globalThis.localStorage === 'undefined') {
      (globalThis as any).localStorage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {}
      };
    } else {
      try {
        if (typeof globalThis.localStorage.getItem !== 'function') {
          (globalThis as any).localStorage.getItem = () => null;
          (globalThis as any).localStorage.setItem = () => {};
          (globalThis as any).localStorage.removeItem = () => {};
          (globalThis as any).localStorage.clear = () => {};
        }
      } catch (e) {
        // If it throws (e.g. read only), we can try to override the getter entirely
        Object.defineProperty(globalThis, 'localStorage', {
          value: {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
            clear: () => {}
          },
          writable: true,
        });
      }
    }
  }
}
