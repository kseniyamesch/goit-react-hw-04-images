import React from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button(props) {
  return (
    <button type="button" onClick={props.onLoadMore} className={s.Button}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
