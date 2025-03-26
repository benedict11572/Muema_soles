import React, { useState, useEffect, useCallback } from 'react';
import { Carousel as BootstrapCarousel, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const images = [
  {
    path: 'airforce1.jpeg',
    alt: 'Nike Air Force 1.jpeg',
    title: 'Classic White',
    description: 'The iconic Air Force 1 in pristine white leather',
  },
  {
    path: 'airforce2.jpeg',
    alt: 'Nike Air Force 1 Black Edition',
    title: 'Black Edition',
    description: 'Premium black leather with enhanced cushioning',
  },
  {
    path: 'airforce3.jpeg',
    alt: 'Nike Air Force 1 Custom Colors',
    title: 'Custom Colors',
    description: 'Express yourself with vibrant color options',
  },
  {
    path: 'airforce4.jpeg',
    alt: 'Nike Air Force 1 Limited Edition',
    title: 'Limited Edition',
    description: 'Exclusive designs for true collectors',
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationInterval, setRotationInterval] = useState(5000);
  const [isHovering, setIsHovering] = useState(false);
  const [fadeTransition, setFadeTransition] = useState(true);

  useEffect(() => {
    let interval;
    if (autoRotate && !isHovering) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, rotationInterval);
    }
    return () => clearInterval(interval);
  }, [autoRotate, isHovering, rotationInterval]);

  const handleSelect = useCallback((selectedIndex) => {
    setActiveIndex(selectedIndex);
  }, []);

  return (
    <div
      className="position-relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <BootstrapCarousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        fade={fadeTransition}
        pause={autoRotate ? 'hover' : false}
        className="shadow-lg rounded-3 overflow-hidden"
        indicators={false}
        controls={false}
      >
        {images.map((img, index) => (
          <BootstrapCarousel.Item key={index} interval={rotationInterval}>
            <Image
              src={process.env.PUBLIC_URL + img.path}
              alt={img.alt}
              className={`d-block w-100 animate__animated ${
                activeIndex === index ? 'animate__fadeIn' : ''
              }`}
              style={{ height: '70vh', objectFit: 'cover', filter: 'brightness(0.95)' }}
              loading="lazy"
            />
            <BootstrapCarousel.Caption className="bg-dark bg-opacity-75 rounded-3 p-4">
              <h3 className="fw-bold display-5 mb-3">{img.title}</h3>
              <p className="lead">{img.description}</p>
              <button className="btn btn-outline-light mt-2">
                Shop Now <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </BootstrapCarousel.Caption>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>

      {/* Custom Controls */}
      <div className="carousel-controls position-absolute w-100 d-flex justify-content-between p-3">
        <button className="btn btn-dark" onClick={() => handleSelect((activeIndex - 1 + images.length) % images.length)}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="btn btn-dark" onClick={() => handleSelect((activeIndex + 1) % images.length)}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Indicators */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`btn btn-sm rounded-circle ${index === activeIndex ? 'btn-warning' : 'btn-light'}`}
            onClick={() => handleSelect(index)}
            style={{ width: '12px', height: '12px' }}
          />
        ))}
      </div>

      {/* Settings Panel */}
      <div className="position-absolute top-0 end-0 m-3">
        <button className="btn btn-outline-light" onClick={() => setAutoRotate(!autoRotate)}>
          {autoRotate ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
        </button>
        <button className="btn btn-outline-light ms-2" onClick={() => setFadeTransition(!fadeTransition)}>
          {fadeTransition ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-arrow-left-right"></i>}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
