// components/AllAuthors.js
import React, { useState, useEffect } from 'react';
import { fetchAuthors } from '../API';
import AuthorList from './AuthorList';

const AllAuthors = () => {  
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const loadauthors = async () => {
      try {
        const data = await fetchAuthors();
        console.log(data)
        setAuthors(data);
      } catch (error) {
        console.error("Error loading authors:", error)
      }
    };
    loadauthors();
  }, []);

  return (
    <div className="app-container">
      <AuthorList authors={authors} />
    </div>
  );
};

export default AllAuthors;
