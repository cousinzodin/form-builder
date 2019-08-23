import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FormPage from './components/pages/FormPage';
import FormConstructorPage from './components/pages/FormConstructorPage';
import FormListPage from './components/pages/FormListPage';
import FormStatsPage from './components/pages/FormStatsPage';
import Error404Page from './components/pages/Error404Page';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>

        <Switch>
          <Route path="/" exact component={FormListPage} />
          <Route path="/form/stats" component={FormStatsPage} />
          <Route path="/form/" component={FormPage} />
          <Route path="/constructor/" component={FormConstructorPage} />
          <Route component={Error404Page} />
        </Switch>

      </Router>
    </React.Fragment>
  );
}

export default App;
