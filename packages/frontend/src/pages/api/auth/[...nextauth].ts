import { QueryClient } from "@tanstack/react-query";
import { getUnauthenticatedAxiosClient, GRAPHQL_URL } from "core/config";
import { graphql } from "core/gql";
import request from "graphql-request";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const queryClient = new QueryClient();

const login = graphql(`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        email
        confirmed
        blocked
        permissions
      }
    }
  }
`);

const me = graphql(`
  query getMe($userId: ID!) {
    people(filters: { user: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          firstname
          lastname
          email
          phone
          avatar {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`);

const options = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  secret: "19SvEenTPP02issoabiIG9G0VqU2MDAM9QiYF9J+Sis=",
  providers: [
    CredentialsProvider({
      id: "username-password",
      name: "Username and Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = await queryClient.fetchQuery(["me"], () =>
            request(GRAPHQL_URL, login, {
              identifier: credentials?.email as string,
              password: credentials?.password as string,
            })
          );
          return data.login as any;
        } catch (e) {
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "auth-callback",
      name: "Auth callback",
      credentials: {
        access_token: { label: "Access Token", type: "text" },
        provider: { label: "Provider Token", type: "text" },
      },
      async authorize(credentials) {
        try {
          const result = await queryClient.fetchQuery(["me"], () =>
            getUnauthenticatedAxiosClient().get(
              `auth/${credentials?.provider}/callback?access_token=${credentials?.access_token}`
            )
          );
          return result.data as any;
        } catch (e) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // Getting the JWT token from API response
    jwt: async ({ token, user }: any) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const data = await queryClient.fetchQuery(["me"], () =>
          request(
            GRAPHQL_URL,
            me,
            {
              userId: user.user.id,
            },
            { Authorization: `Bearer ${user.jwt}` }
          )
        );
        token.jwt = user.jwt;
        token.id = user.user.id;
        token.email = user.user.email;
        token.confirmed = user.user.confirmed;
        token.blocked = user.user.blocked;
        token.permissions = user.user.permissions;
        token.person = data?.people?.data?.[0];
      }
      if (!user && token && token.jwt && !token.person) {
        const data = await queryClient.fetchQuery(["me"], () =>
          request(
            GRAPHQL_URL,
            me,
            {
              userId: token.id,
            },
            { Authorization: `Bearer ${token.jwt}` }
          )
        );

        token.person = data?.people?.data?.[0];
      }
      return Promise.resolve(token);
    },

    session: async ({ session, token }: any) => {
      session.jwt = token.jwt;
      session.id = token.id;
      session.permissions = token.permissions;
      session.person = token.person;
      return Promise.resolve(session);
    },
  },
};

export default NextAuth(options);
