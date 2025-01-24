import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Popover,
  TextField,
} from '@mui/material';
import {
  NotificationsNone as NotificationsIcon,
  Repeat as RepeatIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';

const AddTask = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverType, setPopoverType] = useState(null);

  const handleSubmit = () => {
    if (taskName.trim()) {
      dispatch(addTodo({
        id: Date.now(),
        task: taskName.trim(),
        completed: false,
        starred: false,
        dueDate,
        createdAt: new Date().toISOString(),
      }));
      setTaskName('');
      setDueDate(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box sx={{ 
      bgcolor: '#2F3630',
      p: 2,
      borderRadius: 1,
      mb: 2,
    }}>
      <Typography 
        component="input"
        placeholder="Add A Task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{ 
          color: 'white',
          mb: 2,
          width: '100%',
          bgcolor: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: '15px',
          fontFamily: 'inherit',
          '&::placeholder': {
            color: 'white',
            opacity: 1,
          }
        }}
      />
      
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
      }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton 
            size="small" 
            sx={{ color: '#F5F5F5' }}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setPopoverType('calendar');
            }}
          >
            <CalendarIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: '#F5F5F5' }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: '#F5F5F5' }}>
            <RepeatIcon />
          </IconButton>
        </Box>
        
        <Button 
          variant="contained"
          onClick={handleSubmit}
          disabled={!taskName.trim()}
          sx={{ 
            bgcolor: '#347136',
            color: '#CFCFCF',
            '&:hover': {
              bgcolor: '#2b5c2c',
            },
            '&:disabled': {
              bgcolor: '#2b5c2c',
              color: '#8f8f8f',
            }
          }}
        >
          ADD TASK
        </Button>
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {popoverType === 'calendar' && (
          <TextField
            type="date"
            value={dueDate || ''}
            onChange={(e) => setDueDate(e.target.value)}
            sx={{ p: 2 }}
          />
        )}
      </Popover>
    </Box>
  );
};

export default AddTask; 