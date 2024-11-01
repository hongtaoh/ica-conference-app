// components/AuthorPapers.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPapers } from '../API';
import PaperList from './PaperList';

const AuthorPapers = () => {
  const { ModifiedAuthorName } = useParams();
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const loadPapers = async () => {
      const originalAuthorName = ModifiedAuthorName.replace(/_/g, ' '); // Transform here
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
