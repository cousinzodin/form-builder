import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import {Button, Paper, Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    paddingTop: 0,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    border: '1px solid',
    borderColor:  theme.palette.text.secondary,
    textAlign: 'left',
  },
  centered: {
    textAlign: 'center',
    paddingTop: theme.spacing(2),
  }
}));


export default function FormConstructorItem(props) {
  const classes = useStyles();
  const {type, name, label, placeholder, options, defaultOption} = props;
  const types = [{name: 'Text', value: 'text'}, {name: 'Number', value: 'number'}, {name: 'Dropdown', value: 'dropdown'}, {name: 'Checkmark', value: 'checkmark'}];

  return (
    <div>
      <FormSelect label="Field type" id={"type-field"} options={types} defaultOption={type || types[0]} />
      <FormInput label="Label" id={"label-field"} placeholder="My field" type="text" value={label} />
      <FormInput label="Name" id={"name-field"} placeholder="my-field" type="text" value={name} />
      {type === 'text' || type === 'number' ? <FormInput label="Placeholder" id={"placeholder-field"} placeholder="My helper text" type="text" value={placeholder} /> : null}
      {type === 'dropdown' ?
        <React.Fragment>
          <Typography className={classes.centered}>Add or edit options for your dropdown</Typography>
          {options.map((option, index) => {
            const i = index + 1;
            return (<Paper key={option.value} elevation={0} className={classes.paper}><FormInput label={"Option " + i + " name"} id={"option-name-field-" + i} placeholder="Option name" type="text" value={option.name} />
          <FormInput label={"Option " + i + " value"} id={"option-value-field-" + i} placeholder="option-value" type="text" value={option.value} /></Paper>)
      }
      )}
      <div className={classes.centered}>
      <Button size="small" variant="contained" color="primary">+ Add option</Button></div>
      <FormSelect label="Select default option" id={"default-option-field"} options={options} defaultOption={options[defaultOption].value} />
        </React.Fragment>
        : null
}
    </div >
  )
}
