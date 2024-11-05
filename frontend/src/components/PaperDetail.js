import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSinglePaper } from '../API';
import { Typography, Box, Paper, Button, IconButton, CircularProgress, Tooltip, Container } from '@mui/material';
import { ArrowBack, ContentCopy } from '@mui/icons-material';

const PaperDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    const loadPaper = async () => {
      const data = await fetchSinglePaper(id);
      setPaper(data);
    };
    loadPaper();
  }, [id]);

  if (!paper) return <CircularProgress />;

  // Calculate conference number based on the year
  const conferenceNumber = paper.year - 1950; // 75th in 2025, so 1950 as base

  // Format authors for BibTeX citation
  const formattedAuthors = paper.author_names.join(' and ');

  // Generate BibTeX citation
  const citation = `@article{ica-${paper.paper_id},
  title={${paper.title}},
  author={${formattedAuthors}},
  journal={${conferenceNumber}th Annual Conference of the International Communication Association (ICA)},
  year={${paper.year}},
  publisher={ICA}
}`;

  // Copy citation to clipboard
  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citation);
    alert("Citation copied to clipboard!");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Back Button */}
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)} 
        variant="outlined" 
        color="primary"
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Paper Details */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {paper.title}
        </Typography>
        
        {/* Authors with Affiliations */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
            <strong>Authors:</strong>
          </Typography>
          {paper.authorships.map((author) => (
            <Typography key={author.position} variant="body1" color="text.secondary" display="block">
              {author.author_name} ({author.author_affiliation})
            </Typography>
          ))}
        </Box>

        {/* Year, Division, Session */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" color="text.secondary" display="block">
            <strong>Year:</strong> {paper.year}
          </Typography>
          <Typography variant="body1" color="text.secondary" display="block">
            <strong>Division:</strong> {paper.division || "N/A"}
          </Typography>
          <Typography variant="body1" color="text.secondary" display="block">
            <strong>Session:</strong> {paper.session || "N/A"}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.75 }}>
          {paper.abstract}
        </Typography>
        
      </Paper>

      {/* Citation Section */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Citation
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Box
            component="pre"
            sx={{
              backgroundColor: '#f5f5f5',
              padding: 2,
              borderRadius: 1,
              width: '100%',
              maxWidth: 800,
              overflow: 'auto',
              textAlign: 'left',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
            }}
          >
            {citation}
          </Box>
          <Tooltip title="Copy Citation">
            <IconButton onClick={handleCopyCitation} sx={{ ml: 1 }}>
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Container>
  );
};

export default PaperDetail;
