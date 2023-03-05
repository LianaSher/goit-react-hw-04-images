import PropTypes from 'prop-types';

import {
  GalleryItem,
  Image,
} from '../ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  openModal,
}) => {
  return (
    <GalleryItem>
      <Image
        onClick={() => {
          openModal(largeImageURL);
        }}
        src={webformatURL}
        alt=""
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
