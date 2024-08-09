import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: "45347742-aa7c603dd2b248d0d2e959661",
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

  return (
    <div className="container">
      <h1>Home</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p>orang yang upload adalah {item.user}</p>
            <p>Jumlah yang suka : {item.likes} suka</p>
            <p>{item.tags}</p>
            <img
              src={item.webformatURL}
              alt={item.tags}
              className="img-fluid"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
