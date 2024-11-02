// components/AuthorPapers.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAuthorPapers } from '../API';
import PaperList from './PaperList';

const AuthorPapers = () => {
  const { ModifiedAuthorName } = useParams();
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const loadPapers = async () => {
      const originalAuthorName = ModifiedAuthorName.replace(/_/g, ' '); 
      const data = await fetchAuthorPapers(originalAuthorName);
      setPapers(data);
    };
    loadPapers();
  }, [ModifiedAuthorName]); 

  return (
    <div className="app-container">
      <h3>Papers by {ModifiedAuthorName.replace(/_/g, ' ')}</h3> 
      <PaperList papers={papers} />
    </div>
  );
};

export default AuthorPapers;
