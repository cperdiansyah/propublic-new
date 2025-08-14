import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axiosInstance from '@/lib/axios'
import API from '@/config/api'
import { loginSchema } from '@/lib/validations/auth'
import type { ApiResponse } from '@/types/api'
import type { User } from '@/redux/reducers/authReducer'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // Check if this is an OAuth token login
          if (credentials.email.startsWith('oauth_')) {
            // Extract provider and email from OAuth login
            const [, provider, email] = credentials.email.split('_', 3)
            const token = credentials.password // Token passed as password

            // For OAuth login, we already have the user data and token
            // We'll just validate the token format and return user info
            if (!token || token.length < 10) {
              console.error('Invalid OAuth token format')
              return null
            }

            // Return OAuth user object
            return {
              id: `oauth_${provider}_${email}`,
              email: email,
              name: email.split('@')[0], // Use email prefix as name
              image: null,
              accessToken: token,
              userData: undefined, // OAuth user data would be stored differently
            }
          }

          // Validate credentials with Zod
          const validatedData = loginSchema.parse({
            email: credentials.email,
            password: credentials.password,
          })

          // Make API call to your backend
          const response = await axiosInstance.post<ApiResponse<User>>(
            API.AUTH.V1.LOGIN,
            {
              email: validatedData.email,
              password: validatedData.password,
            },
          )

          const user = response.data.data
          const authHeader =
            response.headers.authorization || response.headers.Authorization
          const token = authHeader?.replace('Bearer ', '') || null

          if (!token) {
            console.error('No token received from server')
            return null
          }

          // Return user object with token
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.username,
            image: user.avatar_url,
            // Store additional user data and token in the session
            accessToken: token,
            userData: user,
          }
        } catch (error) {
          console.error('Login error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the access token and user data to the token right after signin
      if (user) {
        token.accessToken = user.accessToken
        token.userData = user.userData
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.accessToken = (token.accessToken as string) || ''
        session.user = {
          ...session.user,
          id: token.sub || '',
          userData: token.userData as User,
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-key',
}
