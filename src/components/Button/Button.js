import React, { Component } from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    return (
      <button
        type="button"
        onClick={this.props.onLoadMore}
        className={s.Button}
      >
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
