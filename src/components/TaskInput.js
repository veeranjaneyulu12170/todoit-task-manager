import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Popover,
  Button,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  NotificationsNone as ReminderIcon,
  Event as CalendarIcon,
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';

const TaskInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [reminder, setReminder] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateType, setDateType] = useState(null); // 'due' or 'reminder'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        important: false,
        dueDate,
        reminder,
        createdAt: new Date().toISOString(),
      }));
      setText('');
      setDueDate(null);
      setReminder(null);
    }
  };

  const handleDateClick = (type, event) => {
    setDateType(type);
    setAnchorEl(event.currentTarget);
  };

  const handleDateClose = () => {
    setAnchorEl(null);
    setDateType(null);
  };

  const handleDateChange = (date) => {
    if (dateType === 'due') {
      setDueDate(date);
    } else {
      setReminder(date);
    }
    handleDateClose();
  };

  return (
    <Box sx={{ mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          bgcolor: 'background.paper',
          borderRadius: 1,
          p: 1,
        }}>
          <TextField
            fullWidth
            placeholder="Add a task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="standard"
            sx={{ 
              mx: 1,
              '& .MuiInput-underline:before': { borderBottom: 'none' },
              '& .MuiInput-underline:hover:before': { borderBottom: 'none' },
              '& .MuiInput-underline:after': { borderBottom: 'none' },
            }}
          />
          <Stack direction="row" spacing={1}>
            <IconButton 
              size="small"
              onClick={(e) => handleDateClick('due', e)}
              color={dueDate ? 'primary' : 'default'}
            >
              <CalendarIcon />
            </IconButton>
            <IconButton 
              size="small"
              onClick={(e) => handleDateClick('reminder', e)}
              color={reminder ? 'primary' : 'default'}
            >
              <ReminderIcon />
            </IconButton>
            <IconButton 
              type="submit" 
              color="primary"
              disabled={!text.trim()}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Box>
      </form>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleDateClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 2 }}>
            <DateTimePicker
              label={dateType === 'due' ? 'Due Date' : 'Reminder'}
              value={dateType === 'due' ? dueDate : reminder}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleDateClose}>Cancel</Button>
              <Button onClick={() => handleDateChange(null)} color="error">
                Clear
              </Button>
            </Box>
          </Box>
        </Popover>
      </LocalizationProvider>
    </Box>
  );
};

export default TaskInput; 