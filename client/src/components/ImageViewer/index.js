import React from "react";
import "./index.css";

function ImageViewer({ image }) {
  return (
    <div className="image-viewer">
      <img
        className="image-viewer__image"
        src={`/images/${image.imageName}`}
        alt={image.imageCaption}
      />

      <p className="image-viewer__caption">{image.imageCaption}</p>
    </div>
  );
}

export default ImageViewer;
