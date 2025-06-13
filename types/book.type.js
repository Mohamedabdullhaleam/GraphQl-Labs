import { gql } from "apollo-server-express";

export const bookType = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    isbn: String
    availableCopies: Int
    category: String
  }

  input BookInput {
    title: String!
    author: String!
    isbn: String
    availableCopies: Int
    category: String
  }
`;
