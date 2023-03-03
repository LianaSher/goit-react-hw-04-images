import { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from '../Modal/Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClick);
  }

  handleClick = ({ target, currentTarget, code }) => {
    const { closeModal } = this.props;

    if (target === currentTarget || code === 'Escape') {
      closeModal();
    }
  };
  render() {
    const { children } = this.props;

    return (
      <Overlay onClick={this.handleClick}>
        <ModalContainer>{children}</ModalContainer>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
