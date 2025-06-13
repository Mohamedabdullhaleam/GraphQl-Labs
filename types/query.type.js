import { gql } from "apollo-server-express";

export const queryType = gql`
  type Query {
    hello: String
    getBooks: [Book!]!
    getBook(id: ID!): Book
    getMembers: [Member!]!
    availableBooks: [Book!]!
    getMember(id: ID!): Member
    getBorrowings: [Borrowing!]!
    getBorrowing(id: ID!): Borrowing
    me: Member
  }
`;
