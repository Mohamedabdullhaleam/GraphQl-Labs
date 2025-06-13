import { gql } from "apollo-server-express";

export const borrowingType = gql`
  type Borrowing {
    id: ID!
    book: Book!
    member: Member!
    borrowDate: String!
    returnDate: String
    returned: Boolean!
  }
`;
