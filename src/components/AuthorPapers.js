import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { fetchAuthorPapers } from '../API';
import PaperList from './PaperList';

const AuthorPapers = () => {
  const { ModifiedAuthorName } = useParams();
  const [papers, setPapers] = useState([]);
  const originalAuthorName = ModifiedAuthorName.replace(/_/g, ' '); // Define original name here

  useEffect(() => {
    const loadPapers = async () => {
      const data = await fetchAuthorPapers(originalAuthorName);
      setPapers(data);
    };
    loadPapers();
  }, [originalAuthorName]);

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: 6, md: 14 }, px: { xs: 2, sm: 4, md: 0 } }}>
      <PaperList papers={papers} authorName={originalAuthorName} /> 
    </Container>
  );
};

export default AuthorPapers;
