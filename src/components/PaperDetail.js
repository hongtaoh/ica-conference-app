// components/PaperDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSinglePaper } from '../API';

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
      <h2>{paper.title}</h2>
      <p><strong>Year:</strong> {paper.year}</p>
      <p><strong>Paper ID:</strong> {paper.paper_id}</p>
      <p><strong>Authors:</strong> {paper.author_names.join(", ")}</p>
      <p><strong>Abstract:</strong> {paper.abstract}</p>
      <p><strong>Session:</strong> {paper.session}</p>
      <p><strong>Division/Interest Group:</strong> {paper['division']}</p>
    </div>
  );
};

export default PaperDetail;
