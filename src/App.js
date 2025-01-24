import React, { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, IconButton } from '@mui/material';
import { theme, createAppTheme } from './theme';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTotalTasks,
  selectCompletedTasks,
  selectCurrentView,
  selectSelectedTask,
  setCurrentView,
  setSelectedTask,
  selectTheme,
} from './features/todos/todoSlice';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import TaskDetails from './components/TaskDetails';
import TaskInput from './components/TaskInput';
import { Menu as MenuIcon } from '@mui/icons-material';
import { selectIsAuthenticated } from './features/auth/authSlice';
import Login from './components/Login';

const App = () => {
  const dispatch = useDispatch();
  const totalTasks = useSelector(selectTotalTasks);
  const completedTasks = useSelector(selectCompletedTasks);
  const currentView = useSelector(selectCurrentView);
  const selectedTask = useSelector(selectSelectedTask);
  const themeMode = useSelector(selectTheme);
  const theme = useMemo(() => createAppTheme(themeMode), [themeMode]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        <Navbar />
        <Box sx={{ 
          display: 'flex', 
          flex: 1,
          px: 6,
          bgcolor: 'background.default'
        }}>
          <Sidebar
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            currentView={currentView}
            onNavigate={(view) => dispatch(setCurrentView(view))}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <Box sx={{ 
            flex: 1,
            ml: isSidebarOpen ? '280px' : 0,
            transition: 'margin 0.3s ease',
            position: 'relative',
            bgcolor: 'background.default'
          }}>
            <IconButton
              onClick={() => setIsSidebarOpen(true)}
              sx={{
                position: 'fixed',
                left: isSidebarOpen ? -9999 : 16,
                top: 16,
                color: '#FFFFFF',
                bgcolor: '#2C2C2C',
                '&:hover': {
                  bgcolor: '#363636'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              p: 3
            }}>
              <TodoList />
            </Box>
          </Box>
          <TaskDetails
            open={Boolean(selectedTask)}
            onClose={() => dispatch(setSelectedTask(null))}
            task={selectedTask}
          />
        </Box>
        <TaskInput />
      </Box>
    </ThemeProvider>
  );
};

export default App;
