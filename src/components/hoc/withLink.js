import React from 'react';
import {Link} from "react-router-dom";

export default to => WrappedComponent => {
  const renderLink =
    React.forwardRef((itemProps, ref) => (
      <Link to={to} {...itemProps} innerRef={ref} />
    ));

  return class extends React.Component {
    render() {
      return <WrappedComponent component={renderLink} {...this.props} />;
    }
  }
}
