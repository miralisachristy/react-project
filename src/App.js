import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import YouTubeVideos from "./YouTubeVideos";
import "./App.css";
import AppTest from "./AppTest";
import ClockFunction from "./ClockFunction";
import SearchPhotos from "./SearchPhotos";
import Counter from "./Counter";
import MyForm from "./MyForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<AppTest />} />
            <Route path="/photos" element={<SearchPhotos />} />
            <Route path="/videos" element={<YouTubeVideos />} />
            <Route path="/clock" element={<ClockFunction />} />
            <Route path="/Counter" element={<Counter />} />
            <Route path="/Form" element={<MyForm />} />
            {/* Gunakan Counter di sini */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
