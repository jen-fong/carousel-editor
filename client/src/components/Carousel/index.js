import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./Carousel.css";
import CarouselItem from "./CarouselItem";

function Carousel({ images, handleRemoveImages }) {
  const [offset, setOffset] = useState(0);
  const defaultImageCount = 2;
  const [imagesCount, setImagesCount] = useState(defaultImageCount);
  // TODO move to hook
  const [selectedImagesToRemove, setSelectedImagesToRemove] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);

  // I chose 600 because nums 2-5 all divide evenly in 600
  const carouselWidth = 600;

  const imageSizes = carouselWidth / imagesCount;
  const activeSlideStart = offset * imagesCount;
  const lastSet = Math.ceil(images.length / imagesCount) - 1; // -1 for the array index
  const isLastSet = offset === lastSet;
  const isFirstSet = offset === 0;

  // TODO move this to a reducer
  function onPrevClick() {
    if (!isFirstSet) {
      const prev = offset - 1;
      setOffset(prev);
    }
  }

  function onNextClick() {
    if (!isLastSet) {
      const next = offset + 1;
      setOffset(next);
    }
  }

  function toggleImageSelect(selectedImageName) {
    // Usually I would use ids but there wasn't any in the json
    const isSelected = selectedImagesToRemove.includes(selectedImageName);

    let updatedSelectedImages;
    if (isSelected) {
      updatedSelectedImages = selectedImagesToRemove.filter(
        (imageName) => imageName !== selectedImageName
      );
    } else {
      updatedSelectedImages = selectedImagesToRemove.concat(selectedImageName);
    }

    setSelectedImagesToRemove(updatedSelectedImages);
  }

  function removeImages() {
    handleRemoveImages(selectedImagesToRemove);
    setSelectedImagesToRemove([]);
  }

  function view() {
    console.log("view");
  }

  function updateEditMode() {
    setIsEditMode(!isEditMode);
  }

  function handleImageCountUpdate(e) {
    setImagesCount(e.target.value);
  }

  useEffect(() => {
    const carouselIndexOutOfBounds = offset * imagesCount >= images.length;

    // When changing the dropdown option or deleting an image at the end of the
    // carousel, the index will need to be updated so it doesn't show an empty
    // carousel slide
    if (images.length && carouselIndexOutOfBounds) {
      setOffset(lastSet);
    }
  }, [offset, imagesCount, lastSet, images.length]);

  useEffect(() => {
    if (!isEditMode) {
      setSelectedImagesToRemove([]);
    }
  }, [isEditMode]);

  useEffect(() => {
    // reset the edit mode when images have been removed from carousel
    if (isEditMode && !images.length) {
      setIsEditMode(false);
    }
  }, [images.length, isEditMode]);

  if (!images.length) {
    return (
      <section className="carousel-container">
        <p>Please select and add images from above to see images in carousel</p>
      </section>
    );
  }

  return (
    <section className="carousel-container">
      <div
        className="carousel"
        style={{
          width: carouselWidth + 20, // add a little bit of buffer for styling
        }}
      >
        {!images.length
          ? "Please select images from above"
          : images.map((image, i) => {
              const imageInView =
                activeSlideStart <= i &&
                i <= activeSlideStart + imagesCount - 1;

              return (
                <CarouselItem
                  key={image.imageName}
                  image={image}
                  height={imageSizes}
                  width={imageSizes}
                  display={imageInView}
                  isEditMode={isEditMode}
                  selected={selectedImagesToRemove.includes(image.imageName)}
                  handleClick={isEditMode ? toggleImageSelect : view}
                />
              );
            })}

        <button
          className={classNames("arrow-control arrow-control__right", {
            "arrow-control--disabled": isLastSet,
          })}
          onClick={onNextClick}
          disabled={isLastSet}
        >
          <span className="arrow arrow__right"></span>
        </button>

        <button
          className={classNames("arrow-control arrow-control__left", {
            "arrow-control--disabled": isFirstSet,
          })}
          onClick={onPrevClick}
          disabled={isFirstSet}
        >
          <span className="arrow arrow__left"></span>
        </button>
      </div>

      <div className="carousel-mode-toggle">
        <select value={imagesCount} onChange={handleImageCountUpdate}>
          {Array.from(Array(4), (_, x) => x + 2).map((dropdownOption) => {
            return (
              <option
                key={dropdownOption}
                value={dropdownOption}
                selected={imagesCount}
              >
                {dropdownOption}
              </option>
            );
          })}
        </select>

        <button onClick={updateEditMode}>{isEditMode ? "View" : "Edit"}</button>
        {isEditMode && (
          <button
            disabled={!selectedImagesToRemove.length}
            onClick={removeImages}
          >
            Delete
          </button>
        )}
      </div>
    </section>
  );
}

export default Carousel;
