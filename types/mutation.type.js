import { gql } from "apollo-server-express";

export const mutationType = gql`
  type AuthPayload {
    token: String!
    member: Member!
  }

  input BookInput {
    title: String
    author: String
    isbn: String
    availableCopies: Int
    category: String
  }

  type Mutation {
    # Public Mutations
    registerMember(
      name: String!
      email: String!
      password: String!
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!

    # Protected Mutations
    addBook(
      title: String!
      author: String!
      isbn: String!
      availableCopies: Int!
      category: String
    ): Book!
    updateBook(id: ID!, input: BookInput!): Book!
    borrowBook(bookId: ID!): Borrowing!
    returnBook(borrowingId: ID!): Borrowing!
  }
`;
