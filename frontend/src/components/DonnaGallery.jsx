import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const DonnaGallery = ({ images, className = '' }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const galleryRef = useRef(null);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set([...prev, id]));
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedImage]);

  // Calculate aspect ratios for masonry effect
  const getAspectRatio = (index) => {
    const ratios = [
      'aspect-[3/4]',  // Standard portrait
      'aspect-[4/5]',  // Slightly taller
      'aspect-[3/4]',  // Standard portrait
      'aspect-[2/3]',  // Taller portrait
      'aspect-[4/5]',  // Slightly taller
      'aspect-[3/4]',  // Standard portrait
    ];
    return ratios[index % ratios.length];
  };

  return (
    <>
      <div
        ref={galleryRef}
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 ${className}`}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`group relative overflow-hidden bg-charcoal cursor-pointer transition-all duration-700 ${getAspectRatio(index)}`}
            onClick={() => openLightbox(image)}
            style={{
              cursor: 'pointer',
            }}
          >
            <div className="relative w-full h-full">
              <img
                src={image.imageUrl}
                alt={image.alt || `Donna Collection ${index + 1}`}
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                  loadedImages.has(image.id)
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                } group-hover:scale-[1.05]`}
                onLoad={() => handleImageLoad(image.id)}
                loading={index < 12 ? 'eager' : 'lazy'}
                style={{
                  willChange: 'transform',
                }}
              />
              
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Loading placeholder */}
              {!loadedImages.has(image.id) && (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark/20 to-burgundy-dark/20 animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-charcoal/98 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-warmWhite/80 hover:text-gold transition-colors z-10 p-2"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DonnaGallery;

