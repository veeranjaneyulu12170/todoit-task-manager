import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  styled,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ViewModule as GridIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { fadeIn, slideInRight } from '../utils/animations';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.05)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)',
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '400px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const AnimatedSearch = styled(Search)(({ theme }) => ({
  animation: `${slideInRight} 0.3s ease-out`,
  transition: 'width 0.3s ease-out',
}));

const AnimatedAppBar = styled(AppBar)(({ theme }) => ({
  animation: `${fadeIn} 0.3s ease-out`,
  '& .MuiToolbar-root': {
    transition: 'all 0.3s ease-out',
  },
}));

const Header = ({ onToggleMenu, onToggleTheme, onSearch }) => {
  const theme = useTheme();

  return (
    <AnimatedAppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'background.paper',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <AnimatedSearch>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search tasks..."
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </AnimatedSearch>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit">
          <GridIcon />
        </IconButton>
        <IconButton color="inherit" onClick={onToggleTheme}>
          {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AnimatedAppBar>
  );
};

export default Header; 