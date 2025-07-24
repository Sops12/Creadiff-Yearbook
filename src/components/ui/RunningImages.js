"use client";
import { useEffect, useState } from 'react';

export default function RunningImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/running-images');
        if (res.ok) {
          const data = await res.json();
          setImages(data);
        }
      } catch (error) {
        console.error('Error fetching running images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-[#0F103F] py-8">
      <div className="running-images-container">
        <div className="animate-marquee-ltr flex">
          {/* Duplicate images for seamless loop */}
          {[...images, ...images].map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              alt={`Running image ${index + 1}`}
              className="h-25 object-contain mx-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
} 