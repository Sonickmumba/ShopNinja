import React, { useState } from "react";
import "./Carousel.css";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  // Safeguard in case data is empty or undefined
  if (!data || data.length === 0) {
    return <p>No images available</p>; // Handle empty data gracefully
  }

  // Ensure the currentIndex is within the bounds of the array
  const currentItem = data[currentIndex] || {};

  const imageUrl = currentItem.image_url
    ? String(currentItem.image_url)
    : "https://via.placeholder.com/600x400";

  return (
    <div className="carousel">
    <button className="carousel-button prev" onClick={goToPrevious}>
      &#10094;
    </button>
    {data.length > 0 && data[currentIndex] ? (
      <img
        src={imageUrl}
        alt={`Slide ${currentIndex}`}
        className="carousel-image"
      />
    ) : (
      <p>Loading...</p>
    )}
    <button className="carousel-button next" onClick={goToNext}>
      &#10095;
    </button>
  </div>
  );
};

export default Carousel;
