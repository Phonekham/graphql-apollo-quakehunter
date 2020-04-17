import React from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LoginForm from "../components/LoginForm";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Login() {
  const client = useApolloClient();
  console.log(client);

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login);
      if (login) {
        client.writeData({ data: { isLoggedIn: true } });
      }
    },
  });
  if (loading) return <p>locading...</p>;
  if (error) return <p>An error occurred</p>;
  //   return <LoginForm login={login} />;
  return <LoginForm login={login}></LoginForm>;
}
