import axios, { type AxiosError, type AxiosResponse } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('persist:root')
      if (token) {
        try {
          const persistedState = JSON.parse(token)
          const authState = JSON.parse(persistedState.auth)
          if (authState?.token) {
            config.headers.Authorization = `Bearer ${authState.token}`
          }
        } catch (error) {
          console.warn('Error parsing persisted auth state:', error)
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('persist:root')
        window.location.href = '/auth/login'
      }
    }

    const errorMessage = (error.response?.data as any)?.message || error.message
    console.error('API Error:', {
      status: error.response?.status,
      message: errorMessage,
      url: error.config?.url,
    })

    return Promise.reject(error)
  },
)

export default axiosInstance
