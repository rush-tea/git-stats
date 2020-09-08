import React, { Suspense } from 'react';
import Search from './components/SearchPage/SearchPage';
import MoreRepoDetails from './components/MoreRepoDetails'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/SearchPage/SearchPageFooter';
const Profile = React.lazy(() => import('./components/profile'));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/:profile_id" component={Profile} />
          <Route exact path="/:profile_id/:repo_name" component={MoreRepoDetails} />
          <Suspense fallback={<div>Loading...</div>} >
            <Route exact path="/:profile_id" component={Profile} />
          </Suspense>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
