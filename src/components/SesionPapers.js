// components/AuthorPapers.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPapers } from '../services/API';
import PaperList from './PaperList';

const SessionPapers = () => {
  const { session_id} = useParams();
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const loadPapers = async () => {
      const data = await fetchPapers({ has_author: originalAuthorName });
      setPapers(data);
    };
    loadPapers();
  }, [ModifiedAuthorName]);  // Only dependent on ModifiedAuthorName

  return (
    <div className="app-container">
      <h3>Papers by {ModifiedAuthorName.replace(/_/g, ' ')}</h3> {/* Display transformed name */}
      <PaperList papers={papers} />
    </div>
  );
};

export default AuthorPapers;
