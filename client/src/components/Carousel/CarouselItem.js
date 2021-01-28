import React from "react";
import classNames from "classnames";
import "./Carousel.css";

function CarouselItem({
  image,
  height,
  width,
  display,
  handleClick,
  selected,
  isEditMode,
}) {
  return (
    <div
      style={{
        height: height,
        width: width,
        display: display ? "block" : "none", // todo move this to a class?
      }}
      className={classNames("carousel-item", {
        "carousel-item--border": selected,
      })}
      onClick={() => handleClick(image.imageName)}
    >
      <img
        src={`/images/${image.imageName}`}
        alt={image.imageCaption}
        className="carousel__item"
      />

      {!isEditMode && (
        <p className="carousel-item__caption">{image.imageCaption}</p>
      )}
    </div>
  );
}

export default CarouselItem;
