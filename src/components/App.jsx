import { useState, useEffect } from 'react';

import { GlobalStyle } from '../GlobalStyles';
import { AppStyled } from '../components/App.styled';

import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { FetchData } from '../components/servises/FetchData';
import { Button } from '../components/Button/Button';
import { Modal } from '../components/Modal/Modal';
import { Loader } from '../components/servises/Loader';

export const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgInModal, setImgInModal] = useState(null);

  const onSubmit = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  useEffect(() => {
    if (!search) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await FetchData(search, page);
        setTotalItems(data.totalHits);
        setItems(prevItems => [...prevItems, ...data.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [search, page]);

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    setIsModalOpen(true);
    setImgInModal(largeImageURL);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImgInModal(null);
  };

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
};
