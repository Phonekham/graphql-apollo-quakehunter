import React from "react";
import ReactDOM from "react-dom";
import { resolvers, typeDefs } from "./schema";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import App from "./App";
import Login from "./pages/Login";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <Login />;
}

const cache = new InMemoryCache();
const link = new HttpLink({
  headers: { authorization: localStorage.getItem("token") },
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);
