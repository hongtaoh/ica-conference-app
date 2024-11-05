// Cache variables for each JSON file
let cachedPapers = null;
let cachedIndexedPapers = null;
let cachedSessionPapers = null;
let cachedAuthorPaperIds = null;
let cachedAuthors = null;
let cachedSessions = null;

const fetchLocalData = async (fileName) => {
  try {
    const response = await fetch(`/data/${fileName}.json`);
    if (!response.ok) throw new Error(`Failed to fetch ${fileName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error);
    return null;
  }
};

// Wrapper functions that use caching

export const fetchPapers = async () => {
  if (!cachedPapers) {
    cachedPapers = await fetchLocalData('papers');
  }
  return cachedPapers ? cachedPapers.sort((a, b) => b.year - a.year) : [];
};

export const fetchSinglePaper = async (paper_id) => {
  if (!cachedIndexedPapers) {
    cachedIndexedPapers = await fetchLocalData('indexed_papers');
  }
  return cachedIndexedPapers[paper_id] || null;
};

export const fetchSessionPapers = async (session_id) => {
  if (!cachedSessionPapers) {
    cachedSessionPapers = await fetchLocalData('sessionid_papers');
  }
  return cachedSessionPapers[session_id] || [];
};

export const fetchAuthorPapers = async (authorName) => {
  if (!cachedAuthorPaperIds) {
    cachedAuthorPaperIds = await fetchLocalData('author_paper_ids');
  }
  if (!cachedIndexedPapers) {
    cachedIndexedPapers = await fetchLocalData('indexed_papers');
  }
  const paperIds = cachedAuthorPaperIds[authorName]
  if (!paperIds) {
    return [];
  }
  const authorPapers = paperIds.map(
    (paperId) => cachedIndexedPapers[paperId]).filter(Boolean);

  return authorPapers;
};

export const fetchAuthors = async () => {
  if (!cachedAuthors) {
    cachedAuthors = await fetchLocalData('authors');
  }
  return cachedAuthors;
};

export const fetchSessions = async () => {
  if (!cachedSessions) {
    cachedSessions = await fetchLocalData('sessions');
  }
  return cachedSessions;
};