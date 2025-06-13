import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { bookType } from "./types/book.type.js";
import { queryType } from "./types/query.type.js";
import { mutationType } from "./types/mutation.type.js";
import { memberType } from "./types/member.type.js";
import { borrowingType } from "./types/borrowing.type.js";
import { bookResolvers } from "./resolvers/book.resolver.js";
import { memberResolvers } from "./resolvers/member.resolver.js";
import { authResolvers } from "./resolvers/auth.resolver.js";
import { authMiddleware } from "./middleware/auth.js";

const URI =
  "mongodb+srv://PostMingle:PostMingle@postmingle.8cgstgv.mongodb.net/?retryWrites=true&w=majority&appName=PostMingle";

const typeDefs = [bookType, memberType, borrowingType, queryType, mutationType];

const resolvers = {
  Query: {
    ...bookResolvers.Query,
    ...memberResolvers.Query,
    hello: () => "Sba7 el 5eeeer",
  },
  Mutation: {
    addBook: bookResolvers.Mutation.addBook,
    ...authResolvers.Mutation,
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware.authMiddleware,
  });
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
