'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect } from 'react'
import { useForm as useReactHookForm, type UseFormProps } from 'react-hook-form'
import type { z, ZodTypeAny } from 'zod'

type InferFromSchema<S extends ZodTypeAny> = z.infer<S>

interface UseFormOptions<S extends ZodTypeAny>
  extends Omit<UseFormProps<InferFromSchema<S>>, 'resolver'> {
  schema: S
  onSubmit: (data: InferFromSchema<S>) => Promise<void> | void
  externalError?: string | null
  onErrorChange?: (error: string | null) => void
}

export function useForm<S extends ZodTypeAny>({
  schema,
  onSubmit,
  externalError,
  onErrorChange,
  ...options
}: UseFormOptions<S>) {
  const form = useReactHookForm<InferFromSchema<S>>({
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
    } else {
      // Clear root error when it goes away
      clearErrors('root')
    }
  }, [externalError, setError, clearErrors])

  // Enhanced submit handler with error handling
  const onSubmitHandler = useCallback(
    async (data: InferFromSchema<S>) => {
      try {
        clearErrors()
        onErrorChange?.(null)
        await onSubmit(data)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'An error occurred'
        setError('root', { type: 'manual', message })
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
