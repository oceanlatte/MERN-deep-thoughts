import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// ApolloProvider: a special type of React comp. that provides data to all other compon.
// ApolloClient: constructor function that helps initialize connection to the GraphQL API server
// InMemoryCache: enables Apollo Client instance to cache API response data for more efficient perfomance
// createHttpLink: allows control on how the Apollo client makes a request. Like middleware for outbound network requests


import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>

    </ApolloProvider>
  );
}

export default App;
