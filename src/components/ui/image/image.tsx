import React, { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  fallbackSrc = '/images/image-load-failed.svg',
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [altText, setAltText] = useState(alt);

  const handleError = () => {
    // show problematic url in alt text
    setAltText(`IMAGE FAILED: ${imgSrc}`);

    // optionally show fallback image
    setImgSrc(fallbackSrc);
  };

  return <img src={imgSrc} alt={altText} onError={handleError} {...props} />;
};

export default Image;
