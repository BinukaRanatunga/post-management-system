// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Post Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
