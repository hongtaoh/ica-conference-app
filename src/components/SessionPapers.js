import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { fetchSessionPapers } from '../API';
import PaperList from './PaperList';

const SessionPapers = () => {
  const { session_id } = useParams();
  const [papers, setPapers] = useState([]);
  const [sessionName, setSessionName] = useState(''); 

  useEffect(() => {
    const loadPapers = async () => {
      const data = await fetchSessionPapers(session_id);
      setPapers(data);
      if (data.length > 0 && data[0].session_info) {
        setSessionName(data[0].session_info.session); 
      }
    };
    loadPapers();
  }, [session_id]);  

  console.log(session_id)

  return (
    <Container maxWidth="xl" sx={{ mt: 14 }}>
      <PaperList papers={papers} sessionName={sessionName}/>
    </Container>
  );
};

export default SessionPapers;
