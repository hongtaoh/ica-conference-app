import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';

const MainContent = ({ children }) => (
  <Container maxWidth="xl" sx={{ mt: { xs: 6, md: 14 }, px: { xs: 2, sm: 4, md: 0 } }}>
    <Header />
    <Box sx={{ mt: { xs: 9, sm: 10 }, maxWidth: 'xl', mx: 'auto', px: 2 }}>
      {children}
    </Box>
    </Container>
);

export default MainContent;
