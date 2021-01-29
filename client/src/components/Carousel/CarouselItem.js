import React from "react";
import classNames from "classnames";
import "./CarouselItem.css";

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
      }}
      className={classNames("carousel__item", {
        "carousel__item--border": selected,
        active: display,
      })}
      onClick={() => handleClick(image.imageName)}
    >
      <img src={`/images/${image.imageName}`} alt={image.imageCaption} />

      {!isEditMode && (
        <p className="carousel__item-caption">{image.imageCaption}</p>
      )}
    </div>
  );
}

export default CarouselItem;
