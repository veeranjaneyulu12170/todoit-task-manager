import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/todos/todoSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        placeholder="Search tasks..."
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default SearchBar; 