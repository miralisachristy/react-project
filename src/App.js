import React, { useState, useEffect } from "react";
//import Navigation from "./Navigation";
import "./App.css"; // Pastikan untuk mengimpor file CSS

const API_KEY = "AIzaSyAlcnRq-cNEieq2ndQqVtL3veZ5vL5s5ZU"; // Ganti dengan API key kamu
const videoIds = ["juerMO0R_aw", "nhbozauzVwM", "UPkMkIOzej8"]; // ID video yang ingin ditampilkan

function YouTubeVideos() {
  const [videoDetails, setVideoDetails] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(videoIds[0]);

  useEffect(() => {
    const fetchVideos = videoIds.map((videoId) =>
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => data.items[0])
        .catch((error) => console.error("Error:", error))
    );

    Promise.all(fetchVideos).then((details) => setVideoDetails(details));
  }, []);

  if (videoDetails.length === 0) return <div>Loading...</div>;

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const selectedVideoDetails = videoDetails.find(
    (video) => video.id === selectedVideo
  );

  return (
    <div className="container">
      <div className="main-video">
        {selectedVideoDetails && (
          <>
            <h1 style={{ fontSize: "18px" }}>
              {selectedVideoDetails.snippet.title}
            </h1>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedVideoDetails.id}?autoplay=1`} // Autoplay di sini
              frameBorder="0"
              allowFullScreen
              title={selectedVideoDetails.snippet.title}
            ></iframe>
          </>
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeVideos;
