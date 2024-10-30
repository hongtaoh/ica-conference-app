// components/PaperDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSinglePaper } from '../services/api';

const PaperDetail = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    const loadPaper = async () => {
      const data = await fetchSinglePaper(id);
      setPaper(data);
    };
    loadPaper();
  }, [id]);

  if (!paper) return <p>Loading...</p>;

  return (
    <div className="paper-detail-container">
      <h2>{paper.Title}</h2>
      <p><strong>Year:</strong> {paper.Year}</p>
      <p><strong>Authors:</strong> {paper.Authors}</p>
      <p><strong>Abstract:</strong> {paper.Abstract}</p>
      <p><strong>Session:</strong> {paper.Session}</p>
      <p><strong>Division/Unit:</strong> {paper['Division/Unit']}</p>
    </div>
  );
};

export default PaperDetail;
