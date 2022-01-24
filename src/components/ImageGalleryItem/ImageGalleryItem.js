import { ImageGalleryItemLi, ImageGalleryItemImage } from './ImageGalleryItem.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    preview: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <ImageGalleryItemLi>
        <ImageGalleryItemImage
          src={this.props.preview}
          alt={this.props.alt}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.props.img} alt={this.props.alt} />
          </Modal>
        )}
      </ImageGalleryItemLi>
    );
  }
}
