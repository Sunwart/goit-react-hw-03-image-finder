import { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import imagesApi from '../../services/imagesAPI';
import { ImageGalleryContainer } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button.styled';
import Loader from '../Loader/Loader';

export default class ImageGallery extends Component {
  static propTypes = { query: PropTypes.string.isRequired };

  state = {
    images: [],
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const prevPage = prevState.page;
    const newQuery = this.props.query;
    const newPage = this.state.page;

    if ((prevQuery === newQuery && prevPage !== newPage) || prevQuery !== newQuery) {
      this.setState({ status: 'pending' });

      if (prevQuery !== newQuery && prevQuery !== '') {
        prevState.images = [];
        this.setState({ page: 1 });
      }

      imagesApi.getImages(newQuery, newPage).then(images => {
        if (images.hits.length === 0) {
          this.setState({ status: 'rejected' });
          Notiflix.Notify.info('No images found');
          return;
        }

        const rejected = images.hits.length < 12 || newPage * 12 === images.totalHits;

        const currentImages = images.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, preview: webformatURL, img: largeImageURL, alt: tags };
        });

        this.setState({
          status: rejected ? 'rejected' : 'resolved',
          images: [...prevState.images, ...currentImages],
        });
      });
    }
  }

  handleLoadMore() {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return <></>;
    }

    return (
      <>
        <ImageGalleryContainer>
          {images.map(({ id, preview, img, alt }) => (
            <ImageGalleryItem key={id} preview={preview} img={img} alt={alt} />
          ))}
        </ImageGalleryContainer>

        {status === 'pending' && <Loader />}

        {status === 'resolved' && (
          <Button type="button" onClick={() => this.handleLoadMore()}>
            Load more
          </Button>
        )}
      </>
    );
  }
}
