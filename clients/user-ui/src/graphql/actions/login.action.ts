"use client";
import { gql, DocumentNode } from "@apollo/client";

export const LOGIN_USER: DocumentNode = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
        password
        address
        phone_number
      }
      accessToken
      refreshToken
      error {
        message
      }
    }
  }
`;
