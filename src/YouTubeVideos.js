import React, { useState, useEffect, useCallback } from "react";
import "./App.css"; // Ensure CSS file is imported

const API_KEY = "AIzaSyAlcnRq-cNEieq2ndQqVtL3veZ5vL5s5ZU"; // Replace with your API key

function YouTubeVideos() {
  const [videoDetails, setVideoDetails] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVideos = useCallback((videoIds) => {
    setLoading(true);
    const fetchPromises = videoIds.map((videoId) =>
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => data.items[0])
        .catch((error) => console.error("Error:", error))
    );

    Promise.all(fetchPromises)
      .then((details) => {
        setVideoDetails(details);
        if (details.length > 0) {
          setSelectedVideo(details[0].id); // Set the first video as the selected one
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const defaultVideoIds = [
      "juerMO0R_aw",
      "nhbozauzVwM",
      "UPkMkIOzej8",
      "JQEkVH6myhY",
      "FHxteKI-fKg",
    ];
    fetchVideos(defaultVideoIds);
  }, [fetchVideos]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    setLoading(true);
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        searchQuery
      )}&type=video&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const videoIds = data.items.map((item) => item.id.videoId);
        fetchVideos(videoIds);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const selectedVideoDetails = videoDetails.find(
    (video) => video.id === selectedVideo
  );

  return (
    <div className="App">
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="container">
        <div className="main-video-container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            selectedVideoDetails && (
              <>
                <div className="main-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideoDetails.id}?autoplay=1`}
                    allowFullScreen
                    title={selectedVideoDetails.snippet.title}
                  ></iframe>
                </div>
                <h1 className="main-video-title">
                  {selectedVideoDetails.snippet.title}
                </h1>
              </>
            )
          )}
        </div>
        <div className="video-list">
          {videoDetails.map((video) => (
            <div
              key={video.id}
              className="video-item"
              onClick={() => handleVideoClick(video.id)}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h5 className="video-title">{video.snippet.title}</h5>
                <p className="video-views">
                  {`${parseInt(
                    video.statistics.viewCount
                  ).toLocaleString()} views`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YouTubeVideos;
