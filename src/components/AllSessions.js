// components/AllSessions.js
import React, { useState, useEffect } from 'react';
import { fetchSessions } from '../API';
import SessionList from './SessionList';
import { Container } from '@mui/material';

const AllSessions = () => {  
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await fetchSessions();
        setSessions(data);
      } catch (error) {
        console.error("Error loading sessions:", error)
      }
    };
    loadSessions();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 6, md: 14 }, px: { xs: 2, sm: 4, md: 0 } }}>
      <SessionList sessions={sessions} />
    </Container>
  );
};

export default AllSessions;
