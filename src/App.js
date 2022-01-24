import { Component } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';

export default class App extends Component {
  state = { query: '' };

  handleSearchFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery query={this.state.query} />
      </>
    );
  }
}
