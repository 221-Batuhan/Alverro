import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DesignModal from '../../components/DesignModal';
import donnaDesignsData from '../../data/donnaDesigns';

const COLLECTION_INFO = {
  'midnight-star': {
    name: 'Midnight Star',
    description: 'A collection that captures the elegance of evening sophistication, where darkness meets starlight in flowing silhouettes.',
  },
  'ancient-beauty': {
    name: 'Ancient Beauty',
    description: 'Inspired by classical Italian artistry, these designs honor timeless forms with contemporary refinement.',
  },
  '21st-century': {
    name: '21st Century',
    description: 'Modern femininity reimagined through Italian craftsmanship, celebrating the confident woman of today.',
  },
  'timeless-elegance': {
    name: 'Timeless Elegance',
    description: 'Classic lines and refined details that transcend seasons, embodying the essence of Italian luxury.',
  },
  'bridal': {
    name: 'Bridal Collection',
    description: 'Exquisite bridal designs crafted with the finest Italian silks, celebrating the most important moments.',
  },
  'shoes': {
    name: 'Shoes',
    description: 'Handcrafted Italian footwear that combines artisanal tradition with contemporary elegance.',
  },
};

const CollectionPage = () => {
  const { collectionSlug } = useParams();
  const navigate = useNavigate();
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const collectionInfo = COLLECTION_INFO[collectionSlug];
  const collectionName = collectionInfo?.name || 'Collection';

  const designs = useMemo(() => {
    return donnaDesignsData.filter(design => design.collectionSlug === collectionSlug);
  }, [collectionSlug]);

  const handleDesignClick = (design) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDesign(null);
  };

  if (!collectionInfo) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-section text-warmWhite mb-4">Collection Not Found</h1>
          <button
            onClick={() => navigate('/donna')}
            className="btn-outline"
          >
            Back to Donna
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container-luxury py-8 md:py-12">
        <button
          onClick={() => navigate('/donna')}
          className="flex items-center gap-2 text-warmWhite/70 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Donna
        </button>

        <div className="mb-12 max-w-3xl">
          <h1 className="heading-section text-warmWhite mb-6">{collectionInfo.name}</h1>
          <p className="text-luxury text-lg leading-relaxed">
            {collectionInfo.description}
          </p>
        </div>

        {/* Designs Grid */}
        {designs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {designs.map((design) => (
              <div
                key={design.id}
                className="group relative overflow-hidden bg-charcoal cursor-pointer transition-all duration-500 aspect-[3/4]"
                onClick={() => handleDesignClick(design)}
              >
                <img
                  src={design.imageUrl}
                  alt={design.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-warmWhite/70 text-lg">No designs found in this collection.</p>
          </div>
        )}

        {/* Design Modal */}
        <DesignModal
          design={selectedDesign}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default CollectionPage;

