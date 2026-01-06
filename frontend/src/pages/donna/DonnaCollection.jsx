import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DesignModal from '../../components/DesignModal';
import donnaDesignsData from '../../data/donnaDesigns';

const COLLECTIONS = [
  'Midnight Star',
  'Ancient Beauty',
  '21st Century',
  'Timeless Elegance',
  'Bridal Collection',
  'Shoes',
];

const DonnaCollection = () => {
  const navigate = useNavigate();
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDesigns = useMemo(() => {
    if (selectedCollection === 'All') {
      return donnaDesignsData;
    }
    return donnaDesignsData.filter(design => design.collection === selectedCollection);
  }, [selectedCollection]);

  const handleDesignClick = (design) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDesign(null);
  };

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

        <div className="mb-12">
          <h1 className="heading-section text-warmWhite mb-4">Donna Collection</h1>
          <p className="text-luxury text-lg max-w-2xl">
            Explore our curated selection of luxury womenswear designs
          </p>
        </div>

        {/* Collection Filters */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex gap-3 md:gap-4 min-w-max md:flex-wrap">
            {COLLECTIONS.map((collection) => (
              <button
                key={collection}
                onClick={() => setSelectedCollection(collection)}
                className={`px-6 md:px-8 py-3 border rounded-sm transition-all duration-300 uppercase text-sm tracking-wider whitespace-nowrap ${
                  selectedCollection === collection
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-emerald/20 text-warmWhite/70 hover:border-emerald/40 hover:text-warmWhite'
                }`}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredDesigns.map((design, index) => (
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
              
              {/* Collection badge */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-3 py-1 bg-gold/90 text-charcoal text-xs uppercase tracking-wider">
                  {design.collection}
                </span>
              </div>
            </div>
          ))}
        </div>

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

export default DonnaCollection;

