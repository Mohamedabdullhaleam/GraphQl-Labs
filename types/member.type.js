import { gql } from "apollo-server-express";

export const memberType = gql`
  type Member {
    id: ID!
    name: String!
    email: String!
    membershipNumber: String!
    joinDate: String!
    borrowings: [Borrowing!]!
  }
`;
