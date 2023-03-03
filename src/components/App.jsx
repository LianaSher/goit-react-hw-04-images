import { Component } from 'react';

import { GlobalStyle } from '../GlobalStyles';
import { AppStyled } from '../components/App.styled';

import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { FetchData } from '../components/servises/FetchData';
import { Button } from '../components/Button/Button';
import { Modal } from '../components/Modal/Modal';
import { Loader } from '../components/servises/Loader';

export class App extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
    isModalOpen: false,
    imgInModal: null,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      if (prevState.search !== search) {
        this.setState({ page: 1 });
      }

      this.setState({ loading: true });
      FetchData(search, page)
        .then(data => {
          return this.setState(({ items }) => ({ items: [...items, ...data] }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  onSubmit = ({ search }) => {
    this.setState({ search: search, items: [], page: 1 });
  };

  onLoadMoreClick = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  openModal = largeImageURL => {
    this.setState({
      isModalOpen: true,
      imgInModal: largeImageURL,
    });
  };

  closeModal = event => {
    this.setState({
      isModalOpen: false,
      imgInModal: null,
    });
  };

  render() {
    return (
      <AppStyled>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.loading && <Loader />}
        {this.state.error && <p>{this.state.error}</p>}
        <ImageGallery items={this.state.items} openModal={this.openModal} />
        {this.state.items.length > 0 && (
          <Button onClick={this.onLoadMoreClick} />
        )}
        {this.state.isModalOpen && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.imgInModal} alt="" />
          </Modal>
        )}
        <GlobalStyle />
      </AppStyled>
    );
  }
}
