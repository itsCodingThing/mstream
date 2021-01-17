import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";

import "@/styles/Global.css";
import { graphqlURL } from "../utils/url";

const client = new ApolloClient({
    uri: graphqlURL,
    cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default App;
