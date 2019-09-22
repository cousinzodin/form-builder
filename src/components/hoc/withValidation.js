import React from 'react'
import PropTypes from 'prop-types';

const withValidation = () => WrappedComponent => {
  class Comp extends React.Component {
    state = {
      errors: {},
    };

    onBlur = (e) => {
      const {name, value} = e.target;
      this.validateField(name, value);
    }

    onFocus = (e) => {
      this.clearError(e.target.name);
    }

    clearError = (name) => {
      const {errors} = this.state;
      errors[name] = null;
      this.setState({errors});
    }

    validateForm = () => {
      const errors = {};
      let valid = true;
      for (let key in this.props.values) {
        const value = this.props.values[key];
        errors[key] = this.validate(key, value);
        valid = !errors[key] && valid;
      }
      this.setState({errors});
      return valid;
    }

    validateField = (name, value) => {
      const {errors} = this.state;
      errors[name] = this.validate(name, value);
      this.setState({errors});
      return
    }

    validate = (name, value) => {
      const validator = this.props.validations[name] || this.props.validations.defaultValidation || null;
      return validator ? validator(value) : null;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          validateForm={this.validateForm}
          validateField={this.validateField}
          clearError={this.clearError}
        />
      );
    }
  }

  Comp.propTypes = {
    values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    validations: PropTypes.objectOf(PropTypes.func).isRequired,
  };

  return Comp;
};

export default withValidation;
