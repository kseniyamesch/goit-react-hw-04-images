import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  render() {
    const images = this.props.images;
    return (
      <ul className={s.ImageGallery}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              smallImage={image.webformatURL}
              largeImage={image.largeImageURL}
              desc={image.tags}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propType = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
