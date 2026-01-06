import React from 'react';
import { Link } from 'react-router-dom';

const COLLECTIONS = [
  { name: 'Midnight Star', slug: 'midnight-star' },
  { name: 'Ancient Beauty', slug: 'ancient-beauty' },
  { name: '21st Century', slug: '21st-century' },
  { name: 'Timeless Elegance', slug: 'timeless-elegance' },
  { name: 'Bridal Collection', slug: 'bridal' },
  { name: 'Shoes', slug: 'shoes' },
];

const Donna = () => {

  return (
    <div className="relative min-h-screen">
      {/* Hero Section - Editorial Style with Background Image */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/donna/hero-donna.png" // Burayı kendi görsel yolunla değiştirebilirsin
            alt="Donna Heritage"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for transparency (%70) */}
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>

        {/* Hero Content - Centered, Elegant */}
        <div className="container-luxury relative z-10 text-center px-6">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="heading-hero text-warmWhite mb-8 text-balance">
              Donna
            </h1>
            <p className="text-luxury text-xl md:text-2xl max-w-2xl mx-auto mb-4 leading-relaxed">
              Original designs born from sketches, transformed into garments of timeless elegance.
            </p>
            <p className="text-warmWhite/70 text-lg max-w-xl mx-auto mb-16 italic font-serif">
              A refined women's line within a historic Italian luxury house, 
              focused on design, artistry, and feminine sophistication.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-warmWhite mb-8 text-center">
              Italian Heritage, Feminine Elegance
            </h2>
            <div className="space-y-6 text-luxury text-lg leading-relaxed">
              <p>
                Donna represents Alverro's dedication to women's luxury fashion, 
                where Italian heritage meets contemporary femininity. Each design 
                begins as a hand-drawn sketch, capturing the essence of Italian 
                elegance and the grace of modern womanhood.
              </p>
              <p>
                Our collection celebrates the fluidity of form, the sophistication 
                of movement, and the quiet confidence that defines timeless style. 
                We work with master artisans across Italy—from the silk mills of 
                Como to the ateliers of Florence—ensuring every garment reflects 
                the highest standards of craftsmanship and attention to detail.
              </p>
              <p className="text-warmWhite/80 italic font-serif">
                Where artistry meets elegance, tradition meets innovation, 
                and every piece tells a story of Italian luxury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Navigation */}
      <section className="section-padding bg-charcoal-light relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/donna/collection-background.png"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for transparency */}
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        
        {/* Content */}
        <div className="container-luxury relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="heading-section text-warmWhite mb-12 text-center">
              Explore Our Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {COLLECTIONS.map((collection) => (
                <Link
                  key={collection.slug}
                  to={`/donna/${collection.slug}`}
                  className="group relative aspect-[4/3] bg-charcoal border border-emerald/20 hover:border-gold/50 transition-all duration-500 overflow-hidden flex items-center justify-center"
                >
                  <div className="text-center p-8 z-10 relative">
                    <h3 className="text-2xl md:text-3xl font-serif text-warmWhite mb-2 group-hover:text-gold transition-colors duration-300">
                      {collection.name}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark/10 to-burgundy-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donna; 