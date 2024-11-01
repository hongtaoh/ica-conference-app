// components/SessionPapers.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPapersViaSessionID } from '../services/API';
import PaperList from './PaperList';

const SessionPapers = () => {
  const { session_id} = useParams();
  const [papers, setPapers] = useState([]);
  const [sessionName, setSessionName] = useState(''); 

  useEffect(() => {
    const loadPapers = async () => {
      const data = await fetchPapersViaSessionID(session_id);
      setPapers(data);
      if (data.length > 0 && data[0].session_info) {
        setSessionName(data[0].session_info.session); // Assuming `session_info.session` contains the name
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
