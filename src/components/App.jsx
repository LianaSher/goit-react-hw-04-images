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
    totalItems: null,
    isModalOpen: false,
    imgInModal: null,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });
      FetchData(search, page)
        .then(data => {
          this.setState(({ items }) => ({
            items: [...items, ...data.hits],
          }));
          this.setState({ totalItems: data.totalHits });
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  onSubmit = ({ search }) => {
    this.setState({ search: search, items: [], page: 1 });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
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
    const { loading, error, items, totalItems, isModalOpen, imgInModal } =
      this.state;
    const { onSubmit, openModal, onLoadMoreClick, closeModal } = this;

    return (
      <AppStyled>
        <Searchbar onSubmit={onSubmit} />
        {loading && <Loader />}
        {error && <p>{error}</p>}
        <ImageGallery items={items} openModal={openModal} />
        {totalItems > items.length && !loading && (
          <Button onClick={onLoadMoreClick} />
        )}
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <img src={imgInModal} alt="" />
          </Modal>
        )}
        <GlobalStyle />
      </AppStyled>
    );
  }
}
