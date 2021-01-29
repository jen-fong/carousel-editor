import React from "react";
import classNames from "classnames";
import "./ImageItem.css";

function ImageItem({ image, handleImageClick, isSelected }) {
  return (
    <div
      className={classNames("image-selector-card", {
        "image-selector-card--border": isSelected,
      })}
      onClick={() => handleImageClick(image.imageName)}
    >
      <div className="image-selector__image-container">
        <img src={`/images/${image.imageName}`} alt={image.imageName} />
      </div>

      <p className="image-selector-card__text">{image.imageCaption}</p>
    </div>
  );
}

export default ImageItem;
