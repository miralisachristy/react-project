import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const API_KEY = "45347742-aa7c603dd2b248d0d2e959661";

  // Fetch initial data from Pixabay API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: API_KEY,
            q: "",
            image_type: "photo",
            per_page: 20,
          },
        });
        setData(response.data.hits);
      } catch (error) {
        console.error("Error fetching data from Pixabay API", error);
      }
    };

    fetchData();
  }, []);

  // Handler for input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to search for images using Pixabay API
  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://pixabay.com/api/", {
        params: {
          key: API_KEY,
          q: query,
          image_type: "photo",
          per_page: 20,
        },
      });
      setResults(response.data.hits || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Image Search and Display</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for photos..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error.message}</p>}
      {results.length === 0 && !loading && query && (
        <p>No images found for "{query}"</p>
      )}

      <div className="grid-container">
        {(query ? results : data).map((item) => (
          <div className="grid-item" key={item.id}>
            <img
              src={item.webformatURL}
              alt={item.tags || "Image"}
              className="img-fluid"
            />
            <p>{item.tags}</p>
            <p>Uploaded by {item.user}</p>
            <p>{item.likes} likes</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
