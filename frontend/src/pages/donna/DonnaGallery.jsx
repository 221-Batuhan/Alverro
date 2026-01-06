import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonnaGallery from '../../components/DonnaGallery';
import donnaImagesData from '../../data/donnaImages';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DonnaGalleryPage = () => {
  const [images, setImages] = useState(donnaImagesData);
  const [isLoading, setIsLoading] = useState(false);
  const [useBackend, setUseBackend] = useState(false);

  useEffect(() => {
    // Try to fetch from backend, fallback to local data
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/donna/images`);
      if (response.data.success && response.data.images.length > 0) {
        setImages(response.data.images);
        setUseBackend(true);
      }
    } catch (error) {
      // Silently fallback to local data
      console.log('Using local image data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container-luxury py-8 md:py-12">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="heading-section text-warmWhite mb-4">Donna Collection</h1>
          <p className="text-luxury text-lg max-w-2xl mx-auto">
            Editorial gallery showcasing luxury womenswear designs
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-warmWhite/70">Loading gallery...</p>
          </div>
        ) : (
          <DonnaGallery images={images} />
        )}
      </div>
    </div>
  );
};

export default DonnaGalleryPage;

