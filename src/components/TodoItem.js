import React from 'react';
import {
  Box,
  Checkbox,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { toggleImportant, toggleComplete } from '../features/todos/todoSlice';
import { useTheme } from '@mui/material/styles';

const TodoItem = ({ todo, onSelect, isGridView = false, sx = {} }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleToggleImportant = (e) => {
    e.stopPropagation();
    dispatch(toggleImportant(todo.id));
  };

  const handleToggleComplete = (e) => {
    e.stopPropagation();
    dispatch(toggleComplete(todo.id));
  };

  return (
    <Box
      onClick={onSelect}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: isGridView ? { xs: 2, sm: 2.5, md: 3 } : 2,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: isGridView ? { xs: '70px', sm: '80px', md: '90px' } : 'auto',
        position: 'relative',
        overflow: 'hidden',
        color: 'text.primary',
        bgcolor: 'background.card',
        '&:hover': {
          bgcolor: theme.palette.mode === 'dark' ? '#363636' : '#F5F5F5',
        },
        '&::before': isGridView ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        } : {},
        '&:hover::before': isGridView ? {
          opacity: 1,
        } : {},
        ...sx
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={handleToggleComplete}
        onClick={(e) => e.stopPropagation()}
        sx={{
          color: theme.palette.mode === 'dark' ? '#E5E5E5' : '#757575',
          '&.Mui-checked': {
            color: '#4CAF50',
          },
        }}
      />
      <Typography
        sx={{
          color: '#F5F5F5',
          textDecoration: todo.completed ? 'line-through' : 'none',
          flex: 1,
          fontSize: isGridView ? { xs: '0.9rem', sm: '1rem' } : '0.875rem',
          lineHeight: isGridView ? 1.5 : 1.43,
          transition: 'color 0.2s ease',
        }}
      >
        {todo.text}
      </Typography>
      
      <IconButton
        size="small"
        onClick={handleToggleImportant}
        sx={{ 
          color: '#F5F5F5',
          opacity: todo.important ? 1 : 0.5,
          transition: 'all 0.2s ease',
          transform: 'scale(1)',
          '&:hover': {
            opacity: 1,
            transform: 'scale(1.1) rotate(5deg)',
          }
        }}
      >
        {todo.important ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </Box>
  );
};

export default TodoItem; 