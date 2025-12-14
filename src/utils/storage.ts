// Utility to check if localStorage is available
export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

// Generate UUID compatible with older browsers
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback UUID generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Safe localStorage operations
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (!isLocalStorageAvailable()) return null
    try {
      return localStorage.getItem(key)
    } catch (e) {
      console.error('Error reading from localStorage:', e)
      return null
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    if (!isLocalStorageAvailable()) return false
    try {
      localStorage.setItem(key, value)
      return true
    } catch (e) {
      console.error('Error writing to localStorage:', e)
      return false
    }
  },
  
  removeItem: (key: string): boolean => {
    if (!isLocalStorageAvailable()) return false
    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      console.error('Error removing from localStorage:', e)
      return false
    }
  }
}