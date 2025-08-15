// Auth feature public API
// Export only what other features need

// Components
export { default as AuthLayout } from './components/auth-layout'

export { default as LoginPage } from './components/login-page'
export { default as RegisterPage } from './components/register-page'
export { default as ForgotPassword } from './components/forgot-password'

// Services are now in @shared/services/auth and @shared/services/oauth

// Types
export type { User } from '@shared/store/reducers/authReducer'
