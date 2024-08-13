// src/features/explore/ImageCard.js

import React from "react";

class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spans: 0 };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10);
    this.setState({ spans });
  };

  render() {
    const { webformatURL, tags } = this.props.image;
    return (
      <div
        className="image-card"
        style={{ gridRowEnd: `span ${this.state.spans}` }}
      >
        <img ref={this.imageRef} alt={tags} src={webformatURL} />
      </div>
    );
  }
}

export default ImageView;
