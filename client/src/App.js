import { useEffect, useState } from "react";
import axios from "axios";
import ImageSelector from "./components/ImageSelector";
import { baseURL } from "./api";
import "./App.css";
import Carousel from "./components/Carousel";
import ImageViewer from "./components/ImageViewer";

function sortByName(a, b) {
  return a.imageCaption.localeCompare(b.imageCaption, undefined, {
    sensitivity: "accent",
  });
}

function App() {
  const [images, setImages] = useState([]);
  const [selectedImageNames, setSelectedImageNames] = useState([]);
  const [displayImageName, setDisplayImageName] = useState("");

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

  function removeSelectedImages(images) {
    const updatedSelectedImages = selectedImageNames.filter((imageName) => {
      return !images.includes(imageName);
    });

    setSelectedImageNames(updatedSelectedImages);

    // remove the display image if item was deleted in carousel otherwise it
    // would be weird to keep showing the image when it's been removed
    if (images.includes(displayImageName)) {
      setDisplayImageName(null);
    }
  }

  function updateDisplayImage(imageName) {
    setDisplayImageName(imageName);
  }

  const selectedImages = images
    .filter((image) => selectedImageNames.includes(image.imageName))
    .sort(sortByName);

  const availableImages = images
    .filter((image) => !selectedImageNames.includes(image.imageName))
    .sort(sortByName);

  const displayImage = images.find(
    (image) => image.imageName === displayImageName
  );

  return (
    <div className="app">
      <ImageSelector
        availableImages={availableImages}
        handleAddImages={addSelectedImages}
      />

      <Carousel
        images={selectedImages}
        onRemoveImages={removeSelectedImages}
        onUpdateDisplayImage={updateDisplayImage}
      />

      {displayImage && <ImageViewer image={displayImage} />}
    </div>
  );
}

export default App;
