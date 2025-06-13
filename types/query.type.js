import { gql } from "apollo-server-express";

export const queryType = gql`
  type Query {
    hello: String
    getBooks: [Book]
    getBook(id: ID!): Book
  }
`;
