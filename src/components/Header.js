import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {/* close drawer once it is clicked */}
        <ListItem button component={RouterLink} to="/" onClick={toggleDrawer(false)}>
          <ListItemText primary="Papers" />
        </ListItem>
        <ListItem button component={RouterLink} to="/authors" onClick={toggleDrawer(false)}>
          <ListItemText primary="Authors" />
        </ListItem>
        <ListItem button component={RouterLink} to="/sessions" onClick={toggleDrawer(false)}>
          <ListItemText primary="Sessions" />
        </ListItem>
        <ListItem button component={RouterLink} to="/search" onClick={toggleDrawer(false)}>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button component={RouterLink} to="/about" onClick={toggleDrawer(false)}>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Display drawer menu icon on small screens */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            {drawerContent}
          </Drawer>
        </Box>

        {/* Display navigation buttons on medium and larger screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
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

        {/* GitHub icon, always displayed */}
        <IconButton color="inherit" component="a" href="https://github.com/hongtaoh/ica-conference-app" target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
