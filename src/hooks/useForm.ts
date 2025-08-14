'use client'

import {
  useForm as useReactHookForm,
  type UseFormProps,
  type FieldValues,
  type Resolver,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodType, ZodTypeDef } from 'zod'
import { useCallback, useEffect } from 'react'

interface UseFormOptions<T extends FieldValues>
  extends Omit<UseFormProps<T>, 'resolver'> {
  schema: ZodType<T, ZodTypeDef, T>
  onSubmit: (data: T) => Promise<void> | void
  externalError?: string | null
  onErrorChange?: (error: string | null) => void
}

export function useForm<T extends FieldValues>({
  schema,
  onSubmit,
  externalError,
  onErrorChange,
  ...options
}: UseFormOptions<T>) {
  const form = useReactHookForm<T>({
    resolver: zodResolver(schema) as Resolver<T>,
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
