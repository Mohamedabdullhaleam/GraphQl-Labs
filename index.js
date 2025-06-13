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
import { borrowingResolvers } from "./resolvers/borrowing.resolver.js";
import { authMiddleware } from "./middleware/auth.js";

const URI =
  "mongodb+srv://PostMingle:PostMingle@postmingle.8cgstgv.mongodb.net/?retryWrites=true&w=majority&appName=PostMingle";

const typeDefs = [bookType, memberType, borrowingType, queryType, mutationType];

const resolvers = {
  Query: {
    ...bookResolvers.Query,
    ...memberResolvers.Query,
    ...authResolvers.Query,
    ...borrowingResolvers.Query,
    hello: () => "Sba7 el 5eeeer",
  },
  Mutation: {
    ...bookResolvers.Mutation,
    ...memberResolvers.Mutation,
    ...authResolvers.Mutation,
    ...borrowingResolvers.Mutation,
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      // Apply auth middleware and get the modified request
      const { req: modifiedReq } = await authMiddleware({ req });
      // Return the context with the modified request
      return { req: modifiedReq };
    },
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
