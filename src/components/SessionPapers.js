// components/SessionPapers.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSessionPapers } from '../API';
import PaperList from './PaperList';

const SessionPapers = () => {
  const { session_id} = useParams();
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

  return (
    <div className="app-container">
      <h3>Papers in {sessionName || session_id}</h3>
      <PaperList papers={papers} />
    </div>
  );
};

export default SessionPapers;
