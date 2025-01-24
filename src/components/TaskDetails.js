import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Checkbox,
  Divider,
  Slide,
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  NotificationsNone as NotificationsIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Repeat as RepeatIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todos/todoSlice';

const TaskDetails = ({ todo, onClose }) => {
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(todo?.dueDate || null);

  if (!todo) return null;

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
    onClose();
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    dispatch(updateTodo({ ...todo, dueDate: date }));
    setShowDatePicker(false);
  };

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Box sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '452px',
        height: '100vh',
        bgcolor: '#2C2C2C',
        boxShadow: '-4px 0px 15px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1200,
      }}>
        <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
          {/* Task Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Checkbox
              checked={todo?.completed}
              onChange={() => dispatch(updateTodo({ ...todo, completed: !todo.completed }))}
              sx={{ color: '#F5F5F5' }}
            />
            <Typography sx={{ color: '#F5F5F5', flex: 1 }}>
              {todo?.text}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

          {/* Add Step */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            py: 2, 
            color: '#F5F5F5',
            cursor: 'pointer',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
          }}>
            <AddIcon />
            <Typography>Add Step</Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

          {/* Set Reminder */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            py: 2, 
            color: '#F5F5F5',
            cursor: 'pointer',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
          }}>
            <NotificationsIcon />
            <Typography>Set Reminder</Typography>
          </Box>

          {/* Add Due Date */}
          <Box 
            onClick={() => setShowDatePicker(true)}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              py: 2, 
              color: '#F5F5F5',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
            }}
          >
            <CalendarIcon />
            <Typography>
              {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Add Due Date'}
            </Typography>
          </Box>

          {/* Repeat */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            py: 2, 
            color: '#F5F5F5',
            cursor: 'pointer',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
          }}>
            <RepeatIcon />
            <Typography>Repeat</Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

          {/* Notes */}
          <TextField
            multiline
            rows={4}
            placeholder="Add Notes"
            variant="outlined"
            fullWidth
            sx={{
              mt: 2,
              '& .MuiOutlinedInput-root': {
                color: '#F5F5F5',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              },
            }}
          />
        </Box>

        {/* Footer */}
        <Box sx={{
          p: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <IconButton onClick={onClose} sx={{ color: '#F5F5F5' }}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ color: '#A3A8A3' }}>
            Created Today
          </Typography>
          <IconButton 
            onClick={() => setShowDeleteConfirm(true)} 
            sx={{ color: '#F5F5F5' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        {/* Date Picker Dialog */}
        {showDatePicker && (
          <Dialog 
            open={showDatePicker} 
            onClose={() => setShowDatePicker(false)}
            PaperProps={{
              sx: {
                bgcolor: '#2C2C2C',
                color: '#F5F5F5',
              }
            }}
          >
            <Box sx={{ p: 2 }}>
              <TextField
                type="date"
                fullWidth
                value={selectedDate || ''}
                onChange={(e) => handleDateSelect(e.target.value)}
                sx={{
                  '& input': {
                    color: '#F5F5F5',
                  },
                }}
              />
            </Box>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          PaperProps={{
            sx: {
              bgcolor: '#2C2C2C',
              color: '#F5F5F5',
              minWidth: '300px'
            }
          }}
        >
          <DialogTitle>Delete Task?</DialogTitle>
          <Typography sx={{ px: 3, pb: 2 }}>
            This action cannot be undone.
          </Typography>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setShowDeleteConfirm(false)}
              sx={{ color: '#F5F5F5' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDelete}
              sx={{ color: '#ff4444' }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Slide>
  );
};

export default TaskDetails; 