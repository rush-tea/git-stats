import React from 'react';
import Profile from './components/profile';
import Search from './components/SearchPage/SearchPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Footer from './components/SearchPage/SearchPageFooter';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/:profile_id" component={Profile} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
