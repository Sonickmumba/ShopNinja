import { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      backgroundImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "AirMax 360",
      description: "Style and performance for your active lifestyle.",
      buttonText: "Shop Now",
    },
    {
      backgroundImage: "https://images.unsplash.com/photo-1695527081884-06f9dffe919a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "SmartWatch Pro",
      description: "Stay connected and fit with style.",
      buttonText: "Discover More",
    },
    {
      backgroundImage: "https://images.unsplash.com/photo-1545165393-011d14b0dcf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Urban Backpack",
      description: "Perfect for work, travel, and play.",
      buttonText: "Explore",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [slides.length]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          >
            <div className="advertising-content">
              <h1 className="product-title">{slide.title}</h1>
              <p className="product-description">{slide.description}</p>
              <button className="cta-button">{slide.buttonText}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
