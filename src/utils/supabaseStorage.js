// Detect if localStorage is actually writable
function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// Create adaptive storage with in-memory fallback
export function createStorageAdapter() {
  const memoryStore = new Map();
  const useMemory = !isStorageAvailable();
  
  if (useMemory) {
    console.warn('localStorage unavailable (Safari Private Mode?). Using in-memory storage - sessions will not persist across page refreshes.');
  }
  
  return {
    getItem: (key) => {
      if (useMemory) {
        return memoryStore.get(key) || null;
      }
      return localStorage.getItem(key);
    },
    
    setItem: (key, value) => {
      if (useMemory) {
        memoryStore.set(key, value);
        return;
      }
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        // Fallback to memory if localStorage suddenly fails
        memoryStore.set(key, value);
      }
    },
    
    removeItem: (key) => {
      if (useMemory) {
        memoryStore.delete(key);
        return;
      }
      localStorage.removeItem(key);
    }
  };
}
