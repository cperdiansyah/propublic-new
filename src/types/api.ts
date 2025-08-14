export interface ApiResponse<T> {
  success: boolean
  status_code: number
  message: string
  data: T
}

export interface ApiError {
  success: false
  status_code: number
  message: string
  errors?: Record<string, string[]>
}
