import React, { useState, useMemo } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTodos } from '../features/todos/todoSlice';
import AddTask from './AddTask';
import TodoItem from './TodoItem';
import TaskDetails from './TaskDetails';
import { isToday } from '../utils/dateUtils';

const TodoList = () => {
  const theme = useTheme();
  const currentView = useSelector(state => state.todos.currentView);
  const allTodos = useSelector(selectTodos);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const filteredTodos = useMemo(() => {
    switch (currentView) {
      case 'today':
        return allTodos.filter(todo => todo.date && isToday(new Date(todo.date)));
      case 'important':
        return allTodos.filter(todo => todo.important);
      case 'planned':
        return allTodos.filter(todo => todo.date);
      case 'assigned':
        return allTodos.filter(todo => todo.assignedTo);
      default:
        return allTodos;
    }
  }, [allTodos, currentView]);

  // Separate completed and uncompleted tasks
  const uncompletedTasks = filteredTodos.filter(todo => !todo.completed);
  const completedTasks = filteredTodos.filter(todo => todo.completed);

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '1200px',
      bgcolor: 'background.paper',
      py: 3,
      px: { xs: 1.5, sm: 2, md: 3 },
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AddTask />
      
      {/* Uncompleted Tasks Grid */}
      <Grid 
        container 
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{ 
          mt: { xs: 1.5, sm: 2 },
          animation: 'fadeIn 0.3s ease-in-out',
          flex: 1,
          alignContent: 'flex-start'
        }}
      >
        {uncompletedTasks.map((todo, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6}
            md={4}
            key={todo.id}
            sx={{
              animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
              '@keyframes slideIn': {
                from: {
                  opacity: 0,
                  transform: 'translateY(20px)'
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              }
            }}
          >
            <TodoItem 
              todo={todo} 
              onSelect={() => setSelectedTodo(todo)}
              isGridView={true}
              sx={{
                height: '100%',
                minHeight: '100px',
                bgcolor: 'background.card',
                borderRadius: '8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'scale(1)',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? '#363636' : '#F5F5F5',
                  transform: 'scale(1.02)',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 8px 16px rgba(0,0,0,0.4)'
                    : '0 8px 16px rgba(0,0,0,0.1)',
                }
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Completed Tasks List */}
      {completedTasks.length > 0 && (
        <Box 
          sx={{ 
            mt: 'auto',
            pt: 4,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            animation: 'fadeIn 0.4s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 }
            }
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#A3A8A3', 
              mb: 2,
              pl: 1,
              opacity: 0.8
            }}
          >
            Completed ({completedTasks.length})
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {completedTasks.map((todo) => (
              <TodoItem 
                key={todo.id}
                todo={todo} 
                onSelect={() => setSelectedTodo(todo)}
                isGridView={false}
                sx={{
                  bgcolor: 'transparent',
                  opacity: 0.7,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    opacity: 0.9,
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {selectedTodo && (
        <TaskDetails 
          todo={selectedTodo} 
          onClose={() => setSelectedTodo(null)} 
        />
      )}
    </Box>
  );
};

export default TodoList;