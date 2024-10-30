// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PaperList from './components/PaperList';
import PaperDetail from './components/PaperDetail';
import './App.css';
import About from './components/About'

const App = () => (
  <Router>
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<PaperList />} />
        <Route path="/paper/:id" element={<PaperDetail />} />
        <Route path="/about" element={<About />}/>
      </Routes>
    </div>
  </Router>
);

export default App;
