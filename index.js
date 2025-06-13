import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import mongose from "mongoose";

const URI = `mongodb+srv://PostMingle:PostMingle@postmingle.8cgstgv.mongodb.net/?retryWrites=true&w=majority&appName=PostMingle
JWT_SECRET=8cc8ebf6cd10c1f34f273d6b83d803e46bf3aa1754ef2227a36904afa4ca819d`;

const typeDefs = gql`
  type Query {
    hello: String
    users: [String]
  }
`;

const resolvers = {
  Query: {
    hello: () => "Sba7 el 5eeeer",
    users: () => ["Mohamed", "haleem"],
  },
};
async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await mongose.connect(URI);
  console.log("DB connected successfully ✔✔");
  await server.start();
  server.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log(
      `🚀 Server running at http://localhost:4000${server.graphqlPath}`
    );
  });
}

startServer();
