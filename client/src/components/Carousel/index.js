import React, { useEffect, useState } from "react";
import useSelectImageNames from "../../hooks/useSelectImages";
import Dropdown from "../Dropdown";
import CarouselItem from "./CarouselItem";
import ArrowNav from "./ArrowNav";
import Button from "../Button";
import "./index.css";

function Carousel({ images, onRemoveImages, onUpdateDisplayImage }) {
  const [offset, setOffset] = useState(0);
  const defaultImageCount = 2;
  const [imagesCount, setImagesCount] = useState(defaultImageCount);
  const [selectedImagesNames, toggleImageSelect] = useSelectImageNames([]);

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

  function removeImages() {
    onRemoveImages(selectedImagesNames);
    toggleImageSelect([]);
  }

  function view(image) {
    onUpdateDisplayImage(image);
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

  // prevent infinite loop in useEffect
  const memoizedToggleImageSelect = useCallback(() => toggleImageSelect, [
    toggleImageSelect,
  ]);
  useEffect(() => {
    if (!isEditMode) {
      memoizedToggleImageSelect([]);
    }
  }, [isEditMode, memoizedToggleImageSelect]);

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
                  selected={selectedImagesNames.includes(image.imageName)}
                  handleClick={isEditMode ? toggleImageSelect : view}
                />
              );
            })}

        <ArrowNav
          handleClick={onNextClick}
          disabled={isLastSet}
          direction="right"
        />

        <ArrowNav
          handleClick={onPrevClick}
          disabled={isFirstSet}
          direction="left"
        />
      </div>

      <div className="carousel-mode-toggle">
        <select value={imagesCount} onChange={handleImageCountUpdate}>
          {Array.from(Array(4), (_, x) => x + 2).map((dropdownOption) => {
            return (
              <option key={dropdownOption} value={dropdownOption}>
                {dropdownOption}
              </option>
            );
          })}
        </select>

        <button onClick={updateEditMode}>{isEditMode ? "View" : "Edit"}</button>
        {isEditMode && (
          <button disabled={!toggleImageSelect.length} onClick={removeImages}>
            Delete
          </button>
        )}
      </div>
    </section>
  );
}

export default Carousel;
