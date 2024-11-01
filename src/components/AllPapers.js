// components/AllPapers.js
import React, { useState, useEffect } from 'react';
import { fetchSamplePapers } from '../API';
import PaperList from './PaperList';

const AllPapers = () => {  // Removed trailing space in component name
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const loadPapers = async () => {
      const data = await fetchSamplePapers();
      setPapers(data);
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
