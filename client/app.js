import ApolloClient from "apollo-client";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Route, Router, hashHistory } from "react-router";

import SongsList from "./components/SongsList";
import SongCreate from "./components/SongCreate";

const client = new ApolloClient({});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Router history={hashHistory}>
          <Route path="/" component={SongsList} />
          <Route path="/songs/new" component={SongCreate} />
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
