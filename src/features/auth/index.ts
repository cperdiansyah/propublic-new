// Auth feature public API
// Export only what other features need

// Components
export { default as AuthLayout } from './components/auth-layout'

export { default as LoginPage } from './pages/login'
export { default as RegisterPage } from './pages/register'
export { default as ForgotPassword } from './pages/forgot-password'
export { OAuthCallbackPage } from './pages/oauth-callback'

// Services are now in @shared/services/auth and @shared/services/oauth

// Types
export type { User } from '@shared/store/reducers/authReducer'
