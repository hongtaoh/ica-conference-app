import React from 'react';
import { Box, Container } from '@mui/material';

const MainContent = ({ children }) => (
  <Container 
    maxWidth="lg" 
    sx={{ 
      mt: { xs: 6, md: 14 }, 
      px: { xs: 2, sm: 4, md: 0 } 
    }}
  >
    <Box sx={{ mt: { xs: 9, sm: 10 }, width: '100%', mx: 'auto', px: { xs: 2, sm: 4 } }}>
      {children}
    </Box>
  </Container>
);

export default MainContent;
