//Build nav bar with buttons Home, Articles, Topics, Users , use mui for styling
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router';

const NavBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>       
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/articles">
          Articles
        </Button>
        <Button color="inherit" component={Link} to="/topics">
          Topics
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;