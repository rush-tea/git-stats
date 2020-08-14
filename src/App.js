import React from 'react';
import Profile from './components/profile';
import Search from './components/SearchPage';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Search} />
        <Route exact path="/:profile_id" component={Profile} />
      </div>
    </BrowserRouter>
  );
}

export default App;
