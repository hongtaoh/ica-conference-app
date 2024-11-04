from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from fastapi import FastAPI
import json 
import uvicorn

app = FastAPI()

# Load your paper embeddings (replace with your actual loading method)
with open("paper_embeddings.json", "r") as f:
    paper_embeddings = json.load(f)

indexed_papers_file = '../public/data/indexed_papers.json'
with open(indexed_papers_file, "r") as f:
    indexed_papers = json.load(f)

# Convert embeddings to NumPy array
embeddings = np.array(list(paper_embeddings.values()), dtype=np.float32)

# Create a FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# Load the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

@app.get("/search")
def search_papers(query: str):
    query_embedding = model.encode(query)
    k = 5  # Number of nearest neighbors

    # Search for similar embeddings
    distances, indices = index.search(query_embedding.reshape(1, -1), k)

    # Get the top k paper IDs
    top_k_paper_ids = [list(paper_embeddings.keys())[i] for i in indices[0]]

    # Assuming you have a way to retrieve paper details by ID
    top_k_papers = [get_paper_details(indexed_papers, paper_id) for paper_id in top_k_paper_ids]

    return top_k_papers

# Replace this with your actual function to retrieve paper details
def get_paper_details(indexed_papers, paper_id):
    return indexed_papers.get(paper_id) 

# # Run the FastAPI app
# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)