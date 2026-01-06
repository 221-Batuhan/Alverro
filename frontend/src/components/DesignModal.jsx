import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const DesignModal = ({ design, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !design) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/95 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-6xl bg-charcoal-light border border-gold/20 rounded-sm overflow-hidden max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-warmWhite/80 hover:text-gold transition-colors p-2"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[90vh] bg-charcoal">
            <img
              src={design.imageUrl}
              alt={design.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-1 bg-gold/20 text-gold text-xs uppercase tracking-wider mb-4">
                {design.collection}
              </span>
              <h2 className="heading-section text-warmWhite mb-4">
                {design.name}
              </h2>
            </div>

            <div className="space-y-6 text-luxury">
              {design.details.fabricComposition && (
                <div>
                  <h3 className="text-warmWhite font-serif text-lg mb-2">Fabric Composition</h3>
                  <p className="text-warmWhite/80 leading-relaxed">
                    {design.details.fabricComposition}
                  </p>
                </div>
              )}

              {design.details.fitDescription && (
                <div>
                  <h3 className="text-warmWhite font-serif text-lg mb-2">Fit Description</h3>
                  <p className="text-warmWhite/80 leading-relaxed">
                    {design.details.fitDescription}
                  </p>
                </div>
              )}

              {design.details.craftsmanship && (
                <div>
                  <h3 className="text-warmWhite font-serif text-lg mb-2">Craftsmanship</h3>
                  <p className="text-warmWhite/80 leading-relaxed">
                    {design.details.craftsmanship}
                  </p>
                </div>
              )}

              {design.details.seasonalNotes && (
                <div>
                  <h3 className="text-warmWhite font-serif text-lg mb-2">Collection</h3>
                  <p className="text-warmWhite/80 leading-relaxed italic">
                    {design.details.seasonalNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignModal;

