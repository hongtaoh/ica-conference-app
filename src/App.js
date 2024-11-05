import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AllPapers from './components/AllPapers';  
import PaperDetail from './components/PaperDetail';
import AllAuthors from './components/AllAuthors';
import AllSessions from './components/AllSessions';
import AuthorPapers from './components/AuthorPapers';
import SessionPapers from './components/SessionPapers';
import Search from './components/Search';
import About from './components/About';
import MainContent from './components/MainContent';
import Header from './components/Header';

import './App.css';

const App = () => (
  <Router>
    <Header /> {/* Placing Header here to separate it from MainContent */}
    <MainContent>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AllPapers />} />
        <Route path="/authors" element={<AllAuthors />} />
        <Route path="/sessions" element={<AllSessions />} />
        <Route path="/paper/:id" element={<PaperDetail />} />
        <Route path="/authorPapers/:ModifiedAuthorName" element={<AuthorPapers />} />
        <Route path="/sessionPapers/:session_id" element={<SessionPapers />} />
        <Route path="/search" element={<Search />} /> 
      </Routes>
    </MainContent>
  </Router>
);

export default App;
