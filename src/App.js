// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AllPapers from './components/AllPapers';  // Corrected import casing
import AllAuthors from './components/AllAuthors';
import AuthorPapers from './components/AuthorPapers';
import PaperDetail from './components/PaperDetail';
import './App.css';
import About from './components/About';
import AllSessions from './components/AllSessions';

const App = () => (
  <Router>
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/about" element={<About />}/>
        <Route path="/" element={<AllPapers />} />
        <Route path="/authors" element={<AllAuthors />} />
        <Route path="/sessions" element={<AllSessions />} />
        <Route path="/paper/:id" element={<PaperDetail />} />
        <Route path="/papers/:ModifiedAuthorName" element={<AuthorPapers />} />
        <Route path="/papers/:session_id" element={<SessionPapers />} />
      </Routes>
    </div>
  </Router>
);

export default App;
