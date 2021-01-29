import React from "react";
import useSelectImages from "../../hooks/useSelectImages";
import Button from "../Button";
import ImageItem from "./ImageItem";
import "./index.css";

function ImageSelector({ availableImages, onAddImages }) {
  const [selectedImageNames, toggleImageSelect] = useSelectImages([]);

  function handleImageSelect(selectedImageName) {
    toggleImageSelect(selectedImageName);
  }

  function addImagesToCarousel() {
    if (selectedImageNames.length) {
      onAddImages(selectedImageNames);
      toggleImageSelect(null);
    }
  }

  return (
    <section className="image-selector">
      <div className="image-selector-body">
        {availableImages.map((image, i) => {
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
        <Button
          type="primary"
          disabled={!selectedImageNames.length}
          onClick={addImagesToCarousel}
        >
          Add images
        </Button>
      </div>
    </section>
  );
}

export default ImageSelector;
