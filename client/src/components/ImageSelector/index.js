import React, { useState } from "react";
import classNames from "classnames";
import ImageItem from "./ImageItem";
import "./ImageSelector.css";

function ImageSelector({ availableImages, handleAddImages }) {
  const [selectedImages, setSelectedImages] = useState([]);

  function toggleImageSelect(selectedImageName) {
    // Usually I would use ids but there wasn't any in the json
    const isSelected = selectedImages.includes(selectedImageName);

    let updatedSelectedImages;
    if (isSelected) {
      updatedSelectedImages = selectedImages.filter(
        (imageName) => imageName !== selectedImageName
      );
    } else {
      updatedSelectedImages = selectedImages.concat(selectedImageName);
    }

    setSelectedImages(updatedSelectedImages);
  }

  function addImagesToCarousel() {
    if (selectedImages.length) {
      handleAddImages(selectedImages);
      setSelectedImages([]);
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
              handleImageClick={toggleImageSelect}
              isSelected={selectedImages.includes(image.imageName)}
            />
          );
        })}
      </div>

      <div className="image-selector__actions">
        <button
          className={classNames("btn", {
            "btn--disabled": !selectedImages.length,
          })}
          onClick={addImagesToCarousel}
          disabled={!selectedImages.length}
        >
          Add
        </button>
      </div>
    </section>
  );
}

export default ImageSelector;
