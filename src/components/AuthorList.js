import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, TextField, MenuItem, Grid, Button, Typography, Box } from '@mui/material';

const AuthorList = ({ authors }) => {
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [displayedAuthors, setDisplayedAuthors] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterAuthors = useCallback((term, year) => {
    const filtered = authors.filter((author) =>
      (!year || (author.years_attended && author.years_attended.some(ayear => ayear === parseInt(year)))) &&
      (!term ||
        author.author_name.toLowerCase().includes(term.toLowerCase()) ||
        (author.affiliations && author.affiliations.some(aff => aff.toLowerCase().includes(term.toLowerCase())))
      )
    );
    setFilteredAuthors(filtered)
    setDisplayedAuthors(filtered.slice(0, visibleCount));
    setSearchParams({ search_term: term, filtered_year: year });
  }, [authors, visibleCount, setSearchParams]);

  useEffect(() => {
    const initialTerm = searchParams.get('search_term') || '';
    const initialYear = searchParams.get('filtered_year') || '';

    setSearchTerm(initialTerm);
    setSelectedYear(initialYear);
    
    if (authors && authors.length > 0) {
      filterAuthors(initialTerm, initialYear);
      setYears([...new Set(authors.flatMap((author) => author.years_attended))]);
    }
  }, [authors, searchParams, visibleCount, filterAuthors]);

  const handleFilterChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    filterAuthors(searchTerm, year);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterAuthors(term, selectedYear);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedYear('');
    setFilteredAuthors(authors); 
    setDisplayedAuthors(authors.slice(0, visibleCount));
    setSearchParams({});
  };

  const loadMoreAuthors = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setVisibleCount((prevCount) => prevCount + 50);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', loadMoreAuthors);
    return () => window.removeEventListener('scroll', loadMoreAuthors);
  }, [loadMoreAuthors]);

  const handleAuthorClick = (authorName) => {
    const formattedAuthorName = authorName.replace(/\s+/g, '_');
    navigate(`/authorPapers/${encodeURIComponent(formattedAuthorName)}`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Search Authors
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {filteredAuthors.length} authors
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search (Author, Affiliation)"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            select
            label="Filter by Year"
            value={selectedYear}
            onChange={handleFilterChange}
            variant="outlined"
          >
            <MenuItem value="">All Years</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth variant="outlined" onClick={handleReset} sx={{ mt: 1 }}>
            Reset
          </Button>
        </Grid>
      </Grid>

      <div>
        {displayedAuthors.map((author) => (
          <Box key={author.author_name} sx={{ cursor: 'pointer', mb: 2 }} onClick={() => handleAuthorClick(author.author_name)}>
            <Typography variant="h6" className="author-name">
              {author.author_name}
            </Typography>
            <Typography variant="body1" color="text.secondary" className="author-affiliations">
              {author.affiliation_history}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {author.attend_count} conferences attended, {author.paper_count} presentations given.
            </Typography>
          </Box>
        ))}
      </div>
    </Container>
  );
};

export default AuthorList;
