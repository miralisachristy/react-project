import React from "react";
import ImageView from "./ImageView";
import "./ImageList.css";

const ImageList = (props) => {
  const images = props.images.map((image) => {
    return <ImageView key={image.id} image={image} />;
  });

  return <div className="image-list">{images}</div>;
};

export default ImageList;
