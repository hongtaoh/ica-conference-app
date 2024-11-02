// components/AllPapers.js
import React, { useState, useEffect } from 'react';
import { fetchPapers } from '../API';
import PaperList from './PaperList';

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
    <div className="app-container">
      <PaperList papers={papers} />
    </div>
  );
};

export default AllPapers;
