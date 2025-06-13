import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { bookType } from "./types/book.type.js";
import { queryType } from "./types/query.type.js";
import { mutationType } from "./types/mutation.type.js";
import { bookResolvers } from "./resolvers/book.resolver.js";

const URI =
  "mongodb+srv://PostMingle:PostMingle@postmingle.8cgstgv.mongodb.net/?retryWrites=true&w=majority&appName=PostMingle";
const JWT_SECRET =
  "8cc8ebf6cd10c1f34f273d6b83d803e46bf3aa1754ef2227a36904afa4ca819d";

const typeDefs = [bookType, queryType, mutationType];

const resolvers = {
  Query: {
    ...bookResolvers.Query,
    hello: () => "Sba7 el 5eeeer",
  },
  Mutation: {
    ...bookResolvers.Mutation,
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await mongoose.connect(URI);
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
