const { PrismaClient } = require("@prisma/client");
const { GraphQLServer } = require("graphql-yoga");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (requests) => {
    return {
      ...requests,
      prisma,
    };
  },
});

server.start(() => {
  console.log(`Server is running on http://localhost:4000`);
});
