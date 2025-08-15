import { AxiosError } from 'axios'

export interface ApiError {
  message: string
  status: number
  code?: string
  errors?: Record<string, string[]>
  isUserError: boolean
}

export interface ErrorResponse {
  message?: string
  errors?: Record<string, string[]>
  error?: string
  code?: string
}

/**
 * Custom API error handler for user-friendly error messages
 * Handles different error response formats and status codes
 */
export const handleApiError = (error: unknown): ApiError => {
  // Handle Axios errors (API responses)
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500
    const data = error.response?.data as ErrorResponse

    // User input errors (400, 422)
    if (status === 400 || status === 422) {
      return {
        message: data?.message || 'Invalid input data',
        status,
        code: data?.code,
        errors: data?.errors,
        isUserError: true,
      }
    }

    // Unauthorized (401)
    if (status === 401) {
      return {
        message: 'Please log in to continue',
        status,
        code: data?.code,
        isUserError: true,
      }
    }

    // Forbidden (403)
    if (status === 403) {
      return {
        message: 'You do not have permission to perform this action',
        status,
        code: data?.code,
        isUserError: true,
      }
    }

    // Not found (404)
    if (status === 404) {
      return {
        message: 'The requested resource was not found',
        status,
        code: data?.code,
        isUserError: true,
      }
    }

    // Conflict (409)
    if (status === 409) {
      return {
        message: data?.message || 'A conflict occurred with existing data',
        status,
        code: data?.code,
        isUserError: true,
      }
    }

    // Rate limiting (429)
    if (status === 429) {
      return {
        message: 'Too many requests. Please try again later',
        status,
        code: data?.code,
        isUserError: true,
      }
    }

    // Server errors (500+)
    if (status >= 500) {
      return {
        message: 'Server error. Please try again later',
        status,
        code: data?.code,
        isUserError: false,
      }
    }

    // Other client errors
    return {
      message: data?.message || error.message || 'An error occurred',
      status,
      code: data?.code,
      errors: data?.errors,
      isUserError: true,
    }
  }

  // Handle network errors
  if (error instanceof Error) {
    if (
      error.message.includes('Network Error') ||
      error.message.includes('ERR_NETWORK')
    ) {
      return {
        message:
          'Network connection error. Please check your internet connection',
        status: 0,
        isUserError: true,
      }
    }

    // Other JavaScript errors
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
      isUserError: false,
    }
  }

  // Unknown error type
  return {
    message: 'An unexpected error occurred',
    status: 0,
    isUserError: false,
  }
}

/**
 * Format validation errors for display
 * Converts backend validation errors to user-friendly messages
 */
export const formatValidationErrors = (
  errors: Record<string, string[]>,
): string => {
  const messages: string[] = []

  for (const [field, fieldErrors] of Object.entries(errors)) {
    const fieldName = field
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())

    for (const error of fieldErrors) {
      // Clean up error messages
      let cleanError = error
        .replace(/^The\s+/i, '') // Remove "The " prefix
        .replace(new RegExp(`^${field}\\s+`, 'i'), '') // Remove field name prefix
        .trim()

      // Capitalize first letter
      cleanError = cleanError.charAt(0).toUpperCase() + cleanError.slice(1)

      messages.push(`${fieldName}: ${cleanError}`)
    }
  }

  return messages.join('\n')
}

/**
 * Get user-friendly error message for display
 * Prioritizes validation errors, then general message
 */
export const getUserErrorMessage = (apiError: ApiError): string => {
  if (apiError.errors) {
    return formatValidationErrors(apiError.errors)
  }

  return apiError.message
}

/**
 * Determine if error should be shown to user vs logged only
 */
export const shouldShowErrorToUser = (apiError: ApiError): boolean => {
  return apiError.isUserError
}
