// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="header-left">
      <Link to="/" className="header-link">Papers</Link>
      <Link to="/authors" className="header-link">Authors</Link>
      <Link to="/sessions" className="header-link">Sessions</Link>
      <Link to="/search" className="header-link">Search</Link> 
      <Link to="/about" className="header-link">About</Link>
    </div>
    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="github-icon">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" />
    </a>
  </header>
);

export default Header;
