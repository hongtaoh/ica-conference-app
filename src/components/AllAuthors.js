// components/AllAuthors.js
import React, { useState, useEffect } from 'react';
import { fetchAuthors } from '../API';
import AuthorList from './AuthorList';
import { Container } from '@mui/material';


const AllAuthors = () => {  
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const loadauthors = async () => {
      try {
        const data = await fetchAuthors();
        console.log(data)
        setAuthors(data);
      } catch (error) {
        console.error("Error loading authors:", error)
      }
    };
    loadauthors();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 14 }}>
      <AuthorList authors={authors} />
    </Container>
  );
};

export default AllAuthors;
