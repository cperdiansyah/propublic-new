'use client'

import { useForm as useReactHookForm, type UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodSchema } from 'zod'
import { useCallback, useEffect } from 'react'

interface UseFormOptions<T> extends Omit<UseFormProps<T>, 'resolver'> {
  schema: ZodSchema<T>
  onSubmit: (data: T) => Promise<void> | void
  externalError?: string | null
  onErrorChange?: (error: string | null) => void
}

export function useForm<T>({
  schema,
  onSubmit,
  externalError,
  onErrorChange,
  ...options
}: UseFormOptions<T>) {
  const form = useReactHookForm<T>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    ...options,
  })

  const { setError, clearErrors, handleSubmit } = form

  // Handle external errors (e.g., from API)
  useEffect(() => {
    if (externalError) {
      setError('root', {
        type: 'manual',
        message: externalError,
      })
    }
  }, [externalError, setError])

  // Enhanced submit handler with error handling
  const onSubmitHandler = useCallback(
    async (data: T) => {
      try {
        clearErrors()
        onErrorChange?.(null)
        await onSubmit(data)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'An error occurred'
        setError('root', {
          type: 'manual',
          message,
        })
        onErrorChange?.(message)
      }
    },
    [onSubmit, clearErrors, onErrorChange, setError],
  )

  return {
    ...form,
    onSubmit: handleSubmit(onSubmitHandler),
    clearAllErrors: () => {
      clearErrors()
      onErrorChange?.(null)
    },
  }
}
