// components/PaperList.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TextField, MenuItem, Grid, Button, Container, Typography } from '@mui/material';

const PaperList = ({ papers, authorName, sessionName }) => {
  const [displayedPapers, setDisplayedPapers] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterPapers = useCallback((term, year) => {
    const filtered = papers.filter((paper) =>
      (!year || paper.year === parseInt(year)) &&
      (!term ||
        paper.title.toLowerCase().includes(term.toLowerCase()) ||
        (paper.author_names && paper.author_names.some(author => author.toLowerCase().includes(term.toLowerCase()))) ||
        (paper.abstract && paper.abstract.toLowerCase().includes(term.toLowerCase()))
      )
    );
    setDisplayedPapers(filtered.slice(0, visibleCount));
    setSearchParams({ search_term: term, filtered_year: year });
  }, [papers, visibleCount, setSearchParams]);


  useEffect(() => {
    const initialTerm = searchParams.get('search_term') || '';
    const initialYear = searchParams.get('filtered_year') || '';

    setSearchTerm(initialTerm);
    setSelectedYear(initialYear);
    
    filterPapers(initialTerm, initialYear);

    setYears([...new Set(papers.map((paper) => paper.year))]);
  }, [papers, searchParams, visibleCount, filterPapers]);

  const handleFilterChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    filterPapers(searchTerm, year);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterPapers(term, selectedYear);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedYear('');
    setDisplayedPapers(papers.slice(0, visibleCount));
    setSearchParams({});;
  };

  const loadMorePapers = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setVisibleCount((prevCount) => prevCount + 50);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', loadMorePapers);
    return () => window.removeEventListener('scroll', loadMorePapers);
  }, [loadMorePapers]);

  return (
    <Container>
      {papers && authorName && (
        <Typography variant="h4" component="h3" gutterBottom>
          Search Papers by {authorName}
        </Typography>
      )}
      {papers && sessionName && (
        <Typography variant="h4" component="h3" gutterBottom>
          Search Papers in {sessionName}
        </Typography>
      )}
      {papers && !authorName && !sessionName && (
        <Typography variant="h4" component="h3" gutterBottom>
          Search Papers
        </Typography>
      )}
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search (Title, Author, Abstract)"
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
          <Button fullWidth variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>

      <div className="paper-list">
        {displayedPapers.map((paper) => (
          paper ? (
            <div key={paper['paper_id']} className="paper-card" onClick={() => navigate(`/paper/${paper['paper_id']}`)}>
              <p className="paper-title">{paper.title}</p>
              <p className="paper-authors">{paper.author_names.join(", ")}</p>
              <span className="paper-year">{paper.year}</span>
            </div>
          ) : null
        ))}
      </div>
    </div>
    </Container>
  );
};

export default PaperList;