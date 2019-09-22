import React, {Component} from 'react';

const withLoadMore = (WrappedComponent) => {
  class Comp extends Component {
    state = {take: 0};

    onLoadMore = () => {
      const take = this.state.take + 1;
      this.setState({take})
    }

    render() {
      return (
        <WrappedComponent take={this.state.take} onLoadMore={this.onLoadMore} {...this.props} />
      );
    }
  };
  return Comp;
}

export default withLoadMore;

