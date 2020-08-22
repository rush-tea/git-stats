import React from 'react';
import Profile from './components/profile';
import Search from './components/SearchPage';
import {BrowserRouter, Route} from 'react-router-dom';
import MoreRepoDetail from './components/moreRepoDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Search} />
        <Route exact path="/:profile_id" component={Profile} />
        <Route exact path="/:profile_id/:repo_name" component = {MoreRepoDetail}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
