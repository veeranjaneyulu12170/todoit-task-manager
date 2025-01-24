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
  Typography,
  Grid,
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateCustomList, deleteCustomList } from '../features/todos/todoSlice';

const listColors = [
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#F44336', // Red
  '#FFC107', // Yellow
  '#9C27B0', // Purple
  '#FF9800', // Orange
  '#00BCD4', // Cyan
  '#795548', // Brown
  '#607D8B', // Blue Grey
  '#E91E63', // Pink
];

const ColorButton = ({ color, selected, onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      minWidth: 'auto',
      width: 32,
      height: 32,
      borderRadius: '50%',
      bgcolor: color,
      border: selected ? '2px solid white' : 'none',
      '&:hover': {
        bgcolor: color,
        opacity: 0.8,
      },
    }}
  />
);

const EditListDialog = ({ open, onClose, list }) => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState(list?.name || '');
  const [selectedColor, setSelectedColor] = useState(list?.color || listColors[0]);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!listName.trim()) {
      setError('List name is required');
      return;
    }

    dispatch(updateCustomList({
      ...list,
      name: listName.trim(),
      color: selectedColor,
    }));

    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteCustomList(list.id));
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
        Edit List
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
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
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              List Color
            </Typography>
            <Grid container spacing={1}>
              {listColors.map((color) => (
                <Grid item key={color}>
                  <ColorButton
                    color={color}
                    selected={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleDelete}
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete List
        </Button>
        <Box>
          <Button onClick={onClose} sx={{ color: 'white', mr: 1 }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={!listName.trim()}
          >
            Save Changes
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditListDialog; 