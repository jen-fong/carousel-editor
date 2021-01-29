import React, { useState } from "react";
import classNames from "classnames";
import useSelectImages from "../../hooks/useSelectImages";
import ImageItem from "./ImageItem";
import "./ImageSelector.css";

function ImageSelector({ availableImages, onAddImages }) {
  const [selectedImageNames, toggleImageSelect] = useSelectImages([]);

  function handleImageSelect(selectedImageName) {
    toggleImageSelect(selectedImageName);
  }

  function addImagesToCarousel() {
    if (selectedImageNames.length) {
      onAddImages(selectedImageNames);
      toggleImageSelect([]);
    }
  }

  return (
    <section className="image-selector">
      {/* TODO add header here */}

      <div className="image-selector-body">
        {availableImages.map((image, i) => {
          // TODO move the image out to own component
          return (
            <ImageItem
              key={i}
              image={image}
              handleImageClick={handleImageSelect}
              isSelected={selectedImageNames.includes(image.imageName)}
            />
          );
        })}
      </div>

      <div className="image-selector__actions">
        <button
          className={classNames("btn", {
            "btn--disabled": !selectedImageNames.length,
          })}
          onClick={addImagesToCarousel}
          disabled={!selectedImageNames.length}
        >
          Add
        </button>
      </div>
    </section>
  );
}

export default ImageSelector;
