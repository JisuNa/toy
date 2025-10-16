import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import type { Provider } from 'next-auth/providers'

const NaverProvider: Provider = {
  id: 'naver',
  name: 'Naver',
  type: 'oauth',
  clientId: process.env.NAVER_CLIENT_ID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,
  authorization: {
    url: 'https://nid.naver.com/oauth2.0/authorize',
    params: {
      scope: '',
    },
  },
  token: 'https://nid.naver.com/oauth2.0/token',
  userinfo: 'https://openapi.naver.com/v1/nid/me',
  profile(profile) {
    return {
      id: profile.response.id,
      name: profile.response.name,
      email: profile.response.email,
      image: profile.response.profile_image,
    }
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    NaverProvider,
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      if (profile) {
        token.profile = profile
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || ''
        session.user.provider = token.provider as string
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
})
