// components/AllSessions.js
import React, { useState, useEffect } from 'react';
import { fetchSessions } from '../API';
import SessionList from './SessionList';

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
    <div className="app-container">
      <SessionList sessions={sessions} />
    </div>
  );
};

export default AllSessions;
