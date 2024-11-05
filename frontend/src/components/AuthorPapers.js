import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
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
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <PaperList papers={papers} authorName={originalAuthorName} /> 
    </Container>
  );
};

export default AuthorPapers;
