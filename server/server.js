const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// import typeDefs and resolvers from the schemas directory
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// creates a new Apollo server and passes in the schema datea
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an Apollo Server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // integrate the Apollo server with the express application as middleware
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀 API server running on port ${PORT}!`);
      // log where we can go to test the GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

//Call to the async function to start the server
startApolloServer(typeDefs, resolvers);