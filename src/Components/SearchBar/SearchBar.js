import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import './SearchBar.css';

const SearchBar = ({ searchTerm, onChange }) => {
  return (    
    <TextField
      id='outlined'
      label='Search by Name'
      type='search'
      variant='outlined'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={searchTerm}
      onChange={onChange}
    />      
  );
};

export default SearchBar;
