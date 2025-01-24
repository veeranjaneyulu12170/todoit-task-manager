import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addCustomList } from '../features/todos/todoSlice';

const AddListDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!listName.trim()) {
      setError('List name is required');
      return;
    }

    dispatch(addCustomList({
      id: `list-${Date.now()}`,
      name: listName.trim(),
      tasks: [],
    }));

    setListName('');
    setError('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#2D2D2D',
          color: 'white',
          minWidth: 400,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Add New List
        <IconButton
          onClick={onClose}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            label="List Name"
            value={listName}
            onChange={(e) => {
              setListName(e.target.value);
              setError('');
            }}
            error={Boolean(error)}
            helperText={error}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: 'white' }}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!listName.trim()}
        >
          Create List
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddListDialog; 