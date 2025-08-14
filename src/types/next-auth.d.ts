import type { User as CustomUser } from '@/redux/reducers/authReducer'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      userData: CustomUser
    }
  }

  interface User {
    accessToken?: string
    userData?: CustomUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    userData?: CustomUser
  }
}
