import React, { useState } from 'react';
import Image from '../image/image';

interface ImageSliderProps {
  images: string[];
  autoSlide?: boolean;
  slideInterval?: number;
}

export const ImageSliderCodeBased: React.FC<ImageSliderProps> = ({
  images,
  autoSlide = false,
  slideInterval = 3000,
}) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  React.useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(nextSlide, slideInterval);
    return () => clearInterval(interval);
  }, [autoSlide, slideInterval]);

  return (
    <div className="slider">
      <div
        className="slider__track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div className="slider__slide" key={index}>
            <Image
              src={`data:image/jpeg;base64,${img}`}
              alt={`slide-${index}`}
            />
          </div>
        ))}
      </div>

      {
        images?.length > 1 &&
        <>
          <button className="slider__button prev" onClick={prevSlide}>
            ‹
          </button>
          <button className="slider__button next" onClick={nextSlide}>
            ›
          </button>

          <div className="slider__dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`slider__dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </>
      }

    </div>
  );
};
