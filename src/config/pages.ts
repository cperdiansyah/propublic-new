const ROUTE = {
  PUBLIC: {
    HOME: '/',
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      FORGOT_PASSWORD: '/auth/forgot-password',
    },
    ACADEMY: {
      _: '/academy',
      DETAIL: (slug: string) => `/academy/${slug}`,
    },
    GAME: {
      _: '/game',
      DETAIL: (slug: string) => `/game/${slug}`,
    },
    REPLAY: '/replay',
    SHOP: '/shop',
  },
  PRIVATE: {},
}

export default ROUTE
