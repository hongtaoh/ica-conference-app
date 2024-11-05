import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';

const MainContent = ({ children }) => (
  <>
    <Header />
    <Box sx={{ mt: { xs: 9, sm: 10 }, maxWidth: 'xl', mx: 'auto', px: 2 }}>
      {children}
    </Box>
  </>
);

export default MainContent;
