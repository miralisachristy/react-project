// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import YouTubeVideos from "./YouTubeVideos"; // Import your YouTubeVideos component
import "./App.css";
import AppTest from "./AppTest";
import ClockFunction from "./ClockFunction";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<AppTest />} />
            <Route path="/videos" element={<YouTubeVideos />} />
            <Route path="/clock" element={<ClockFunction />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
