import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';

const AddList = ({ open, onClose, onAdd }) => {
  const [listName, setListName] = useState('');
  const [color, setColor] = useState('#4CAF50');

  const colors = ['#4CAF50', '#2196F3', '#F44336', '#FFC107', '#9C27B0'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      onAdd({
        id: Date.now(),
        name: listName,
        color: color,
        todos: [],
      });
      setListName('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          New List
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            fullWidth
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Choose Color
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {colors.map((c) => (
                <IconButton
                  key={c}
                  onClick={() => setColor(c)}
                  sx={{
                    bgcolor: c,
                    color: 'white',
                    '&:hover': { bgcolor: c },
                    ...(color === c && {
                      outline: '2px solid',
                      outlineColor: 'primary.main',
                    }),
                  }}
                >
                  <PaletteIcon />
                </IconButton>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create List
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddList; 