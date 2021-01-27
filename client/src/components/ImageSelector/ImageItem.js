import React from "react";
import classNames from "classnames";
import "./ImageSelector.css";

function ImageItem({ image, handleImageClick, isSelected }) {
  return (
    <div
      className={classNames("card", {
        "card--border": isSelected,
      })}
    >
      <div className="image-selector__image-container">
        <img
          src={`/images/${image.imageName}`}
          alt={image.imageName}
          className="image-selector__image-container-image"
          onClick={() => handleImageClick(image.imageName)}
        />
      </div>

      <p className="card__text">{image.imageCaption}</p>
    </div>
  );
}

export default ImageItem;
