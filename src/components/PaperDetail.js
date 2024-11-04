import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSinglePaper } from '../API';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

  // Calculate conference number based on the year
  const conferenceNumber = paper.year - 1950; // 75th in 2025, so 1950 as base

  // Format authors for BibTeX citation
  const formattedAuthors = paper.author_names.join(' and ');

  // Generate BibTeX citation
  const citation = `@article{ica-${paper.paper_id},
  title={${paper.title}},
  author={${formattedAuthors}},
  journal={${conferenceNumber}th Annual Conference of the International Communication Association},
  year={${paper.year}},
  publisher={ICA}
}`;

  // Copy citation to clipboard
  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citation);
    alert("Citation copied to clipboard!");
  };

  return (
    <div className="paper-detail-container">
      <h2>{paper.title}</h2>
      <p><strong>Year:</strong> {paper.year}</p>
      <p><strong>Paper ID:</strong> {paper.paper_id}</p>
      <p><strong>Authors:</strong> {paper.author_names.join(", ")}</p>
      <p><strong>Abstract:</strong> {paper.abstract}</p>
      <p><strong>Session:</strong> {paper.session || "N/A"}</p>
      <p><strong>Division/Interest Group:</strong> {paper.division || "N/A"}</p>

      {/* Citation section */}
      <div className="citation-container">
        <h3>Citation</h3>
        <pre className="citation-box">
          {citation}
          <button className="copy-icon-button" onClick={handleCopyCitation} title="Copy Citation">
            <i className="fas fa-copy"></i>
          </button>
        </pre>
      </div>
    </div>
  );
};

export default PaperDetail;
