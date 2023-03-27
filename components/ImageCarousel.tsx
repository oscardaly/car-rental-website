import React, {useState, useEffect} from "react";
import styles from "./ImageCarousel.module.css";

const TEN_SECONDS = 10000;

interface ImageProps {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: ImageProps[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, TEN_SECONDS);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className={styles.carousel}>
      <div className={styles.overlay}></div>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={`${styles.carouselImage} ${currentIndex === index ? styles.carouselImage__show : ""}`}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
