import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/SearchPage/SearchPage';
import Footer from './components/SearchPage/SearchPageFooter';
import Profile from './components/profile';

import MoreRepoDetails from './components/MoreRepoDetails';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/:profile_id" component={Profile} />
          <Route exact path="/:profile_id/:repo_name" component={MoreRepoDetails} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
