import { gql } from "apollo-server-express";

export const mutationType = gql`
  type Mutation {
    createBook(input: BookInput!): Book
    updateBook(id: ID!, input: BookInput!): Book
  }
`;
