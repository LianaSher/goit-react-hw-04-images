import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  SearchBarStyled,
  FormStyled,
  SearchFormButton,
  ButtonLabel,
  Input,
} from '../Searchbar/SearchBar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ search });
    setSearch('');
  };

  return (
    <SearchBarStyled>
      <FormStyled onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchFormButton>

        <Input
          value={search}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </FormStyled>
    </SearchBarStyled>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
