import React from 'react';
import axios from 'axios';
import {ENDPOINT} from '../../config';
import {Paper, Fab, Button, CircularProgress} from '@material-ui/core/';
import styled from '../hoc/styled';
import Layout from '../layout/Layout';
//import FormItem from '../shared/FormItem';
import FormConstructorItem from '../shared/FormConstructorItem';
import FormInput from '../shared/FormInput';


const StyledPaper = styled(Paper)(theme => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  textAlign: 'left',
}));

export default class FormConstructorPage extends React.Component {

  state = {form: null};

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      axios.get(ENDPOINT + "forms/" + id)
        .then(response => {
          this.setState({form: response.data});
        });
    } else {
      this.setState({form: {name: "My new form", fields: []}});
    }
  }

  render() {
    let content = <CircularProgress />;
    if (this.state.form) {
      content =
        <React.Fragment>
          <StyledPaper>
            <FormInput label="Form title" id="new-form-title-field" placeholder="My new form" value={this.state.form.name} />
          </StyledPaper>
          {this.state.form.fields.map(field => (
            <StyledPaper key={field.name}>
              <FormConstructorItem type={field.type}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                options={field.items}
                defaultOption={field.default} />
            </StyledPaper>
          ))}
          <Button variant="contained" color="primary">+ Add new field</Button>
        </React.Fragment>;
    }
    return (
      <Layout withLink action={<Fab variant="extended" color="secondary" disabled={!this.state.form}> Save Form </Fab>}>
        {content}
      </Layout>
    );
  }
}

