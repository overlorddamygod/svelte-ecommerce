
import {SvelteKitAuth, type SvelteKitAuthConfig} from "@auth/sveltekit"
import CredentialsProvider from '@auth/core/providers/credentials';
import { json, redirect } from "@sveltejs/kit";
import type {  Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const authorization: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/api/cart")) {
    const session = await event.locals.getSession();
    if (!session) {
      // unauthorized json response
      return json({
        error: "Unauthorized"
      }, {
        status: 401
      })
    }
  }

  if (event.url.pathname.startsWith("/cart")) {
    const session = await event.locals.getSession();
    if (!session) {
      throw redirect(303, "/login");
    }
  }

  // If the request is still here, just proceed as normally
  return resolve(event);
}

export const handle = sequence(SvelteKitAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith a", email: "jsmith@example.com" }
        console.log("HERE","SAD", credentials)
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
      
    })
  ],
  // set id in session
  callbacks: {
    // jwt: async ({ token, user }) => {
    //   if (user) {
    //     token.id = user.sub;
    //   }
    //   return token;
    // },
    session: ({ session, user, token }) => {
      console.log("SAD",session, user, token)
      if ( session.user ) {
        session.user.id = token.sub!;
      }
      return session;
    }
  }
}), authorization);