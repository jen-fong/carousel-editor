import { useEffect, useState } from "react";
import axios from "axios";
import ImageSelector from "./components/ImageSelector";
import { baseURL } from "./api";
import "./App.css";
import Carousel from "./components/Carousel";

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
    setSelectedImageNames(updatedSelectedImages);
  }

  const selectedImages = images.filter((image) =>
    selectedImageNames.includes(image.imageName)
  );
  const availableImages = images
    .filter((image) => !selectedImageNames.includes(image.imageName))
    .sort((a, b) =>
      a.imageCaption.toLowerCase().localeCompare(b.imageCaption.toLowerCase())
    );

  return (
    <div className="app">
      <ImageSelector
        availableImages={availableImages}
        handleAddImages={addSelectedImages}
      />

      <Carousel images={selectedImages} />
    </div>
  );
}

export default App;
