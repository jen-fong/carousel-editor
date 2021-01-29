import React, { useEffect, useState } from "react";
import useSelectImageNames from "../../hooks/useSelectImages";
import Dropdown from "../Dropdown";
import CarouselItem from "./CarouselItem";
import ArrowNav from "./ArrowNav";
import Button from "../Button";
import "./index.css";

const defaultImageCount = 2;
const dropdownOptions = Array.from(Array(4), (_, x) => x + 2);

function Carousel({ images, onRemoveImages, onUpdateDisplayImage }) {
  const [offset, setOffset] = useState(0);
  const [carouselImagesCount, setCarouselImagesCount] = useState(
    defaultImageCount
  );
  const [selectedImagesNames, toggleImageSelect] = useSelectImageNames([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // I chose 600 because nums 2-5 all divide evenly in 600 but otherwise, I
  // would do some calculations to get the number of images and their max
  // width into the carousel
  const carouselWidth = 600;

  const imageSize = carouselWidth / carouselImagesCount;
  const lastSet = Math.ceil(images.length / carouselImagesCount) - 1; // -1 for the array index
  const isLastSet = offset === lastSet;
  const isFirstSet = offset === 0;

  function getImagesInDisplay() {
    const start = offset * carouselImagesCount;
    const end = start + carouselImagesCount;
    const hasMoreThanOneSet = images.length > carouselImagesCount;
    let imagesInDisplay = images.slice(start, end);

    if (isLastSet && hasMoreThanOneSet) {
      const missingImagesCount = carouselImagesCount - imagesInDisplay.length;
      const imagesToFill = images.slice(start - missingImagesCount, start);
      imagesInDisplay = [...imagesToFill, ...imagesInDisplay];
    }
    return imagesInDisplay.map((image) => image.imageName);
  }

  const imagesInDisplay = getImagesInDisplay();

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
    toggleImageSelect(null);
  }

  function updateImageViewer(image) {
    onUpdateDisplayImage(image);
  }

  function updateEditMode() {
    if (!isEditMode) {
      updateImageViewer(null);
    } else {
      toggleImageSelect(null);
    }

    setIsEditMode(!isEditMode);
  }

  function handleCarouselImageCountUpdate(e) {
    setCarouselImagesCount(parseInt(e.target.value));
  }

  useEffect(() => {
    const carouselIndexOutOfBounds =
      offset * carouselImagesCount >= images.length;

    // When changing the dropdown option or deleting an image at the end of the
    // carousel, the index will need to be updated so it doesn't show an empty
    // carousel slide
    if (images.length && carouselIndexOutOfBounds) {
      setOffset(lastSet);
    }
  }, [offset, carouselImagesCount, lastSet, images.length]);

  if (!images.length) {
    return (
      <section className="carousel-container">
        <p>Please select and add images from above to see images in carousel</p>
      </section>
    );
  }

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
      <div className="carousel-controls">
        <Dropdown
          label="Select Number of Images"
          id="carouselImageCount"
          options={dropdownOptions}
          value={carouselImagesCount}
          handleChange={handleCarouselImageCountUpdate}
        />

        <Button type="primary" onClick={updateEditMode} style={{ width: 80 }}>
          {isEditMode ? "View" : "Edit"}
        </Button>

        <Button
          type="remove"
          disabled={!selectedImagesNames.length}
          onClick={removeImages}
          style={{
            visibility: !isEditMode ? "hidden" : "visible",
            width: 100,
          }}
        >
          Delete
        </Button>
      </div>

      <div
        className="carousel"
        style={{
          width: carouselWidth + 50, // add a little bit of buffer for styling
        }}
      >
        {images.map((image, i) => {
          const imageInView = imagesInDisplay.includes(image.imageName);

          return (
            <CarouselItem
              key={image.imageName}
              image={image}
              height={imageSize}
              width={imageSize}
              display={imageInView}
              isEditMode={isEditMode}
              selected={selectedImagesNames.includes(image.imageName)}
              handleClick={isEditMode ? toggleImageSelect : updateImageViewer}
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
    </section>
  );
}

export default Carousel;
