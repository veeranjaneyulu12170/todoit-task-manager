import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  NotificationsNone as ReminderIcon,
  Event as CalendarIcon,
  Repeat as RepeatIcon,
} from '@mui/icons-material';

const TodoInput = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo({
        id: Date.now(),
        text: text.trim(),
        completed: false,
        important: false,
        dueDate: null,
        reminder: null,
        repeat: false,
      });
      setText('');
      setShowOptions(false);
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="Add a task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setShowOptions(true)}
            variant="standard"
            sx={{ mr: 1 }}
          />
          <IconButton type="submit" color="primary">
            <AddIcon />
          </IconButton>
        </Box>
        {showOptions && (
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <IconButton size="small">
              <ReminderIcon />
            </IconButton>
            <IconButton size="small">
              <CalendarIcon />
            </IconButton>
            <IconButton size="small">
              <RepeatIcon />
            </IconButton>
          </Box>
        )}
      </form>
    </Paper>
  );
};

export default TodoInput;
