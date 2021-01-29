import { useCallback, useState } from "react";

function useSelectImages(initialState = []) {
  const [selectedImageNames, setSelectedImageNames] = useState(initialState);

  const toggleImageSelect = function (selectedImageName) {
    // Usually I would use ids but there wasn't any in the json
    const isSelected = selectedImageNames.includes(selectedImageName);

    let updatedSelectedImages = [];
    if (isSelected) {
      updatedSelectedImages = selectedImageNames.filter(
        (imageName) => imageName !== selectedImageName
      );
    } else if (selectedImageName !== null) {
      updatedSelectedImages = selectedImageNames.concat(selectedImageName);
    }

    setSelectedImageNames(updatedSelectedImages);
  };

  return [selectedImageNames, toggleImageSelect];
}

export default useSelectImages;
