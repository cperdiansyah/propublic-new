// Auth feature public API
// Export only what other features need

// Components
export { default as AuthLayout } from './components/auth-layout'

export { default as LoginPage } from './components/login-page'
export { default as RegisterPage } from './components/register-page'
export { default as ForgotPassword } from './components/forgot-password'

// Services
export * from './services/auth'
export * from './services/oauth'

// Types
export type { User } from '@shared/store/reducers/authReducer'
