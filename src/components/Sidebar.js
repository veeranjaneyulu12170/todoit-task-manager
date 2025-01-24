import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  FormatListBulleted as ListIcon,
  Star as StarIcon,
  Event as EventIcon,
  AssignmentInd as AssignmentIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, setCurrentView } from '../features/todos/todoSlice';
import DoItLogo from './assets/logomark.png'; // Make sure to add the logo to assets folder

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const currentView = useSelector(state => state.todos.currentView);
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const handleViewChange = (view) => {
    dispatch(setCurrentView(view));
  };

  // Navigation items configuration
  const navItems = [
    { id: 'all', label: 'All Tasks', icon: ListIcon },
    { id: 'today', label: 'Today', icon: ListIcon },
    { id: 'important', label: 'Important', icon: StarIcon },
    { id: 'planned', label: 'Planned', icon: EventIcon },
    { id: 'assigned', label: 'Assigned to me', icon: AssignmentIcon },
  ];

  return (
    <Box sx={{
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: '280px',
      bgcolor: '#1E1E1E',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      zIndex: 1300,
    }}>
      {/* Header with Logo */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img 
            src={DoItLogo} 
            alt="DoIt" 
            style={{ 
              width: 28, 
              height: 28,
              filter: 'brightness(0) invert(1)'
            }} 
          />
          <Typography sx={{ color: '#97F69B', fontWeight: 500 }}>DoIt</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#FFFFFF' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* User Profile */}
      <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 48, height: 48 }} />
        <Typography>Hey, ABCD</Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 2, mb: 2 }} />

      {/* Navigation Menu Box - Adjusted height and scrolling */}
      <Box sx={{ 
        mx: 2, 
        bgcolor: '#232323', 
        borderRadius: 2,
        overflow: 'auto', // Changed to auto to enable scrolling if needed
        p: 1,
        maxHeight: '35vh', // Limit maximum height
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        },
      }}>
        <List sx={{ 
          p: 0,
          '& .MuiListItem-root': {
            borderRadius: 1,
            mb: 0.5,
            height: 36, // Reduced height slightly
            minHeight: 36,
          },
          '& .MuiListItem-root:last-child': {
            mb: 0,
          }
        }}>
          {navItems.map((item) => (
            <ListItem 
              key={item.id}
              button 
              selected={currentView === item.id}
              onClick={() => handleViewChange(item.id)}
              sx={{ 
                bgcolor: currentView === item.id ? '#97F69B20' : 'transparent',
                '&:hover': { 
                  bgcolor: currentView === item.id ? '#97F69B30' : 'rgba(255,255,255,0.05)' 
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: currentView === item.id ? '#97F69B' : '#FFFFFF', 
                minWidth: 32 
              }}>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontSize: '0.875rem',
                  color: currentView === item.id ? '#97F69B' : '#FFFFFF',
                  fontWeight: currentView === item.id ? 500 : 400,
                  whiteSpace: 'nowrap'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 2, my: 2 }} />

      {/* Add List Box */}
      <Box sx={{ 
        mx: 2,
        mt: 2,
        bgcolor: '#232323',
        borderRadius: 2,
      }}>
        <ListItem 
          button 
          sx={{ 
            p: 2,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          <Typography>Add list</Typography>
        </ListItem>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 2, my: 2 }} />

      {/* Progress Section Box */}
      <Box sx={{ 
        mt: 'auto', 
        mx: 2,
        mb: 2,
        bgcolor: '#232323',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: { xs: '180px', sm: '200px' },
        maxHeight: '220px',
      }}>
        {/* Header */}
        <Box sx={{ 
          p: 2,
          pb: 1,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}>
          <Typography variant="subtitle2">Today Tasks</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2">{totalTasks}</Typography>
            <InfoIcon sx={{ fontSize: 16, opacity: 0.7 }} />
          </Box>
        </Box>

        {/* Progress Circle */}
        <Box sx={{ 
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          py: 1,
        }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={80}
            thickness={6}
            sx={{ color: '#2C2C2C', position: 'absolute' }}
          />
          <CircularProgress
            variant="determinate"
            value={(pendingTasks / totalTasks) * 100}
            size={80}
            thickness={6}
            sx={{ 
              color: '#97F69B',
              position: 'absolute',
              opacity: 0.3,
              rotate: '180deg'
            }}
          />
          <CircularProgress
            variant="determinate"
            value={(completedTasks / totalTasks) * 100}
            size={80}
            thickness={6}
            sx={{ 
              color: '#97F69B',
              rotate: '180deg'
            }}
          />
        </Box>

        {/* Indicators */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 3,
          p: 2,
          pt: 1,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: '#97F69B',
              opacity: 0.3
            }} />
            <Typography variant="caption" sx={{ color: '#97F69B', opacity: 0.7 }}>
              Pending
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: '#97F69B'
            }} />
            <Typography variant="caption" sx={{ color: '#97F69B', opacity: 0.7 }}>
              Done
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;