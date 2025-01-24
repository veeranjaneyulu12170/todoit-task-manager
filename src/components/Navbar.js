import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  InputBase,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Apps as AppsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, toggleTheme } from '../features/todos/todoSlice';
import { selectUser, logout } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: 'background.navbar',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ px: 4, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box 
              component="img"
              src="/logo.png" 
              alt="DoIt Logo"
              sx={{ width: 32, height: 32 }}
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#3F9142',
                fontFamily: 'Sen',
                fontWeight: 700,
              }}
            >
              DoIt
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          {showSearch ? (
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              borderRadius: 1,
              px: 2,
              mr: 1
            }}>
              <InputBase
                placeholder="Search tasks..."
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                sx={{ 
                  color: 'text.primary',
                  width: 200,
                  '& input::placeholder': {
                    color: 'text.secondary',
                    opacity: 0.5,
                  }
                }}
                autoFocus
              />
              <IconButton 
                color="inherit" 
                onClick={() => setShowSearch(false)}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <IconButton 
              color="inherit"
              onClick={() => setShowSearch(true)}
            >
              <SearchIcon />
            </IconButton>
          )}
          <IconButton color="inherit">
            <AppsIcon />
          </IconButton>
          <IconButton 
            color="inherit"
            onClick={handleThemeToggle}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Box sx={{ ml: 2 }}>
            <IconButton onClick={handleMenu}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.name?.charAt(0)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 