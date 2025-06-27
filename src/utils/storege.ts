// Storage utilities for Redux Persist
export const storage = {
  getItem: (key: string): Promise<string | null> => {
    try {
      const item = localStorage.getItem(key)
      return Promise.resolve(item)
    } catch (error) {
      console.error('Error getting item from storage:', error)
      return Promise.resolve(null)
    }
  },

  setItem: (key: string, value: string): Promise<void> => {
    try {
      localStorage.setItem(key, value)
      return Promise.resolve()
    } catch (error) {
      console.error('Error setting item in storage:', error)
      return Promise.reject(error)
    }
  },

  removeItem: (key: string): Promise<void> => {
    try {
      localStorage.removeItem(key)
      return Promise.resolve()
    } catch (error) {
      console.error('Error removing item from storage:', error)
      return Promise.reject(error)
    }
  },
}
