import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const About = () => (
  <Container maxWidth="md" sx={{ mt: { xs: 6, md: 14 }, px: { xs: 2, sm: 4, md: 0 } }}>
    <Typography variant="h4" component="h1" gutterBottom>
      About
    </Typography>

    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" paragraph fontSize={{ xs: '1rem', md: '1.25rem' }}>
        This website displays the annual ICA conference data (2003-2018) which contains 27,466 papers, 21,038 authors, and 4,935 sessions.
      </Typography>
      <Typography variant="body1" paragraph fontSize={{ xs: '1rem', md: '1.25rem' }}>
        The data come from the{' '}
        <Link href="https://www.icahdq.org/page/annual-conference" target="_blank" rel="noopener">
          official website of ICA
        </Link>
        . The source code to scrape and wrangle the data will be available after ICA 2025 peer-review is done. Full datasets and codes to build the API and this web app will also be released then.
      </Typography>
    </Box>
  </Container>
);

export default About;
