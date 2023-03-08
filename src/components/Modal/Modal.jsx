import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from '../Modal/Modal.styled';

export const Modal = ({ closeModal, children }) => {
  const handleClick = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleClick);
    };
  }, []);

  return (
    <Overlay onClick={handleClick}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
