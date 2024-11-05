import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, CircularProgress, Card, CardContent, Typography, Container, Box, Alert, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

// Cache for storing API results based on query and topPapers
const cache = {};

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [embeddingsLoading, setEmbeddingsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topPapers, setTopPapers] = useState(5);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const localAPI = 'http://localhost:8000/search';
  const productionAPI = 'https://icaconfsearchapi.onrender.com/search';

  const fetchSearchResults = useCallback(async (initialQuery, initialTopPapers) => {
    const cacheKey = `${initialQuery}_${initialTopPapers};`
    
    // Check if the result is already in the cache
    if (cache[cacheKey]) {
      setResults(cache[cacheKey]);
      return;
    }

    setLoading(true);
    setEmbeddingsLoading(true);
    setError(null);

    try {
      const response = await axios.get(localAPI, {
        params: { query: initialQuery, k: initialTopPapers },
      });
      setResults(response.data);
      cache[cacheKey] = response.data; // Cache the result
      setSearchParams({ query: initialQuery, topPapers: initialTopPapers });
    } catch (err) {
      try {
        const response = await axios.get(productionAPI, {
          params: { query: initialQuery, k: initialTopPapers },
        });
        setResults(response.data);
        cache[cacheKey] = response.data; // Cache the result
        setSearchParams({ query: initialQuery, topPapers: initialTopPapers });
      } catch (error) {
        setError('An error occurred during search');
        console.error(error);
      }
    } finally {
      setLoading(false);
      setEmbeddingsLoading(false);
    }
  }, [localAPI, productionAPI, setSearchParams]);

  useEffect(() => {
    const initialQuery = searchParams.get('query') || '';
    const initialTopPapers = parseInt(searchParams.get('topPapers'), 10) || 5;

    setQuery(initialQuery);
    setTopPapers(initialTopPapers);

    if (initialQuery) {
      fetchSearchResults(initialQuery, initialTopPapers);
    }
  }, [searchParams, fetchSearchResults]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query, topPapers });
    fetchSearchResults(query, topPapers);
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
    <Container maxWidth="md" sx={{ mt: 14 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Search Relevant Papers (Beta)
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter your query here; it can be a key word, a sentence, or even a paragraph :)"
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
          Embeddings loading now, please wait until it is done. This might take a minute when this is your first search as the API spins down with inactivity.
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