import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };
  handleClick = () => {
    this.toggleModal();
  };
  render() {
    const { smallImage, largeImage, desc } = this.props;
    return (
      <>
        <li className={s.ImageGalleryItem}>
          <img
            src={smallImage}
            alt={desc}
            className={s.ImageGalleryItemImage}
            onClick={this.handleClick}
          ></img>
        </li>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt={desc}></img>
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propType = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};
