import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Route, Switch} from "react-router-dom";
import FormPage from './components/pages/form/FormPage';
import FormConstructorPage from './components/pages/formConstructor/FormConstructorPage';
import FormListPage from './components/pages/formList/FormListPage';
import FormStatsPage from './components/pages/formStats/FormStatsPage';
import Error404Page from './components/pages/Error404Page';
import ModalWrapper from './components/shared/ModalWrapper';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/`} exact component={FormListPage} />
        <Route path={`${process.env.PUBLIC_URL}/form/stats/:id`} component={FormStatsPage} />
        <Route path={`${process.env.PUBLIC_URL}/form/:id`} component={FormPage} />
        <Route path={`${process.env.PUBLIC_URL}/constructor/:id`} component={FormConstructorPage} />
        <Route path={`${process.env.PUBLIC_URL}/constructor/`} component={FormConstructorPage} />
        <Route component={Error404Page} />
      </Switch>
      <ModalWrapper />
    </React.Fragment>
  );
}

export default App;
