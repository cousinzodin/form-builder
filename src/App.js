import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Route, Switch} from "react-router-dom";
import FormPage from './components/pages/FormPage';
import FormConstructorPage from './components/pages/FormConstructorPage';
import FormListPage from './components/pages/FormListPage';
import FormStatsPage from './components/pages/FormStatsPage';
import Error404Page from './components/pages/Error404Page';
import ModalWrapper from './components/shared/ModalWrapper';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={FormListPage} />
        <Route path="/form/stats/:id" component={FormStatsPage} />
        <Route path="/form/:id" component={FormPage} />
        <Route path="/constructor/:id" component={FormConstructorPage} />
        <Route path="/constructor/" component={FormConstructorPage} />
        <Route component={Error404Page} />
      </Switch>
      <ModalWrapper />
    </React.Fragment>
  );
}

export default App;
