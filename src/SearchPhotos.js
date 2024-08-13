// src/components/SearchPhotos.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./SearchPhotos.css";
import ImageView from "./components/ImageView";

const API_KEY = "45347742-aa7c603dd2b248d0d2e959661";
const API_URL = "https://pixabay.com/api/";

function SearchPhotos() {
  const [query, setQuery] = useState("umbrella");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      if (!query) return;
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
          },
        });
        setPhotos(response.data.hits);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  useEffect(() => {
    handleSearch({ preventDefault: () => {} });
  }, [handleSearch]);

  return (
    <div>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for photos..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {loading && <p>Loading...</p>}
      <div className="image-list">
        {photos.map((image) => (
          <ImageView key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default SearchPhotos;
