import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, CircularProgress, Card, CardContent, Typography, Container, Box, Alert, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [embeddingsLoading, setEmbeddingsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topPapers, setTopPapers] = useState(5);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Extract parameters once
    const initialQuery = searchParams.get('query') || '';
    const initialTopPapers = parseInt(searchParams.get('topPapers'), 10) || 5;

    setQuery(initialQuery);
    setTopPapers(initialTopPapers);

    // Define and immediately invoke an async function to handle search
    const fetchSearchResults = async () => {
      if (initialQuery) {
        setLoading(true);
        setEmbeddingsLoading(true);
        setError(null);

        try {
          // Call the API to get search results
          const response = await axios.get(`http://localhost:8000/search`, {
            params: { query: initialQuery, k: initialTopPapers }
          });
          setResults(response.data);
          // Update search parameters in the URL
          setSearchParams({ query: initialQuery, topPapers: initialTopPapers });
        } catch (err) {
          setError('An error occurred during search');
          console.error(err);
        } finally {
          setLoading(false);
          setEmbeddingsLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [searchParams, setSearchParams]); // Only include `searchParams` here, not `handleSearch`

  const handleSubmit = (event) => {
    event.preventDefault();
    // Trigger search with current query and topPapers
    setSearchParams({ query, topPapers });
  };

  const handleReset = () => {
    setQuery('');
    setResults([]);
    setError(null);
    setTopPapers(5);
    setSearchParams({});
  };

  const increaseTopPapers = () => setTopPapers((prev) => prev + 1);
  const decreaseTopPapers = () => setTopPapers((prev) => Math.max(1, prev - 1));

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Search Relevant Papers
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter your query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
        />
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          Search
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="body1">Top Results: {topPapers}</Typography>
        <IconButton onClick={increaseTopPapers} color="primary" size="small">
          <Add />
        </IconButton>
        <IconButton onClick={decreaseTopPapers} color="primary" size="small">
          <Remove />
        </IconButton>
      </Box>

      {loading && <CircularProgress />}
      {embeddingsLoading && (
        <Alert severity="info" sx={{ my: 2 }}>
          Embeddings loading now, please wait until it is done. This might take a minute or two.
        </Alert>
      )}
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, mb: 2 }}>
        {results.map((paper) => (
          <Card key={paper['paper_id']} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/paper/${paper['paper_id']}`)}>
            <CardContent>
              <Typography variant="h6" component="div" className="paper-title">
                {paper.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="paper-authors">
                {paper.author_names.join(", ")}
              </Typography>
              <Typography variant="caption" color="text.secondary" className="paper-year">
                {paper.year}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Search;
