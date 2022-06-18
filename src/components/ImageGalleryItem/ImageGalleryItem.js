import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem(props) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function handleClick() {
    toggleModal();
  }

  const { smallImage, largeImage, desc } = props;
  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          src={smallImage}
          alt={desc}
          className={s.ImageGalleryItemImage}
          onClick={handleClick}
        ></img>
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={desc}></img>
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propType = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};
