import ApolloClient from "apollo-client";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Route, Router, hashHistory } from "react-router";

import "./style/style.css";
import SongsList from "./components/SongsList";
import SongCreate from "./components/SongCreate";
import SongDetails from "./components/SongDetails";

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Router history={hashHistory}>
          <Route path="/" component={SongsList} />
          <Route path="/songs/new" component={SongCreate} />
          <Route path="/songs/:id" component={SongDetails} />
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
