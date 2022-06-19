import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export default function Modal(props) {
  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      props.onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        props.onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.onClose]);

  const { children } = props;
  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propType = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
