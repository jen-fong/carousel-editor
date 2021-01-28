import { useEffect, useState } from "react";
import axios from "axios";
import ImageSelector from "./components/ImageSelector";
import { baseURL } from "./api";
import "./App.css";
import Carousel from "./components/Carousel";

function sortByName(a, b) {
  return a.imageCaption.localeCompare(b.imageCaption, undefined, {
    sensitivity: "accent",
  });
}

function App() {
  const [images, setImages] = useState([]);
  const [selectedImageNames, setSelectedImageNames] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/images`).then((res) => {
      const carouselImages = res.data.carouselImages.map((image) => image);

      setImages(carouselImages);
    });
  }, []);

  function addSelectedImages(images) {
    const updatedSelectedImages = selectedImageNames.concat(images);
    console.log(updatedSelectedImages);
    setSelectedImageNames(updatedSelectedImages);
  }

  function removeSelectedImages(images) {
    const updatedSelectedImages = selectedImageNames.filter((imageName) => {
      return !images.includes(imageName);
    });
    console.log("remove", selectedImages);
    setSelectedImageNames(updatedSelectedImages);
  }

  const selectedImages = images
    .filter((image) => selectedImageNames.includes(image.imageName))
    .sort(sortByName);

  const availableImages = images
    .filter((image) => !selectedImageNames.includes(image.imageName))
    .sort(sortByName);

  return (
    <div className="app">
      <ImageSelector
        availableImages={availableImages}
        handleAddImages={addSelectedImages}
      />

      <Carousel
        images={selectedImages}
        handleRemoveImages={removeSelectedImages}
      />
    </div>
  );
}

export default App;
