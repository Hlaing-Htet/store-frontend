import Head from "next/head";
import "styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import { createClient, Provider } from "urql";
import Navbar from "components/Navbar";
import { StateContextProvider } from "lib/context";
import Footer from "components/Footer";
import UserLayout from "components/layouts/UserLayout";

const client = createClient({ url: process.env.NEXT_PUBLIC_GRAPHQL_URL });

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContextProvider>
        <Provider value={client}>
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
        </Provider>
      </StateContextProvider>
    </UserProvider>
  );
}
