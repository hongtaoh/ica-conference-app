import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Header = () => (
  <AppBar position="fixed" color="primary">
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button color="inherit" component={RouterLink} to="/">
          Papers
        </Button>
        <Button color="inherit" component={RouterLink} to="/authors">
          Authors
        </Button>
        <Button color="inherit" component={RouterLink} to="/sessions">
          Sessions
        </Button>
        <Button color="inherit" component={RouterLink} to="/search">
          Search
        </Button>
        <Button color="inherit" component={RouterLink} to="/about">
          About
        </Button>
      </Box>
      <IconButton
        color="inherit"
        component="a"
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Header;
