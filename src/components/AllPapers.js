// components/AllPapers.js
import React, { useState, useEffect } from 'react';
import { fetchPapers } from '../API';
import PaperList from './PaperList';
import { Container } from '@mui/material';

const AllPapers = () => {  
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const loadPapers = async () => {
      try {
        const data = await fetchPapers();
        setPapers(data);
      } catch (error) {
        console.error("Error loading papers:", error)
      }
    };
    loadPapers();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: 6, md: 14 }, px: { xs: 2, sm: 2, md: 0 } }}>
      <PaperList papers={papers} />
    </Container>
  );
};

export default AllPapers;
