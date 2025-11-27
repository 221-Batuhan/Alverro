import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-dark via-charcoal to-charcoal">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A86A' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="container-luxury relative z-10 text-center">
          <div className="animate-fade-in">
            <h1 className="heading-hero text-warmWhite mb-6 text-balance">
              Italian Heritage
              <br />
              <span className="text-gold">Reimagined</span>
            </h1>
            <p className="text-luxury text-lg md:text-xl max-w-2xl mx-auto mb-10 text-balance">
              Discover timeless elegance crafted with Italian tradition. 
              Where heritage meets modern sophistication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2 group">
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/new-season" className="btn-outline inline-flex items-center gap-2">
                New Season
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="section-padding bg-charcoal-light">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <h2 className="heading-section text-warmWhite mb-4">
              Our Collections
            </h2>
            <p className="text-luxury max-w-2xl mx-auto">
              Curated selections that embody the essence of Italian luxury
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Heritage Collection */}
            <Link 
              to="/collections?filter=heritage" 
              className="group relative overflow-hidden rounded-sm bg-emerald-dark/30 border border-gold/20 hover:border-gold/50 transition-all duration-500"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-emerald-dark to-emerald flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-serif text-gold mb-3 group-hover:scale-105 transition-transform duration-300">
                    Heritage
                  </h3>
                  <p className="text-warmWhite/70 text-sm">
                    Timeless classics
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-gold text-sm uppercase tracking-wider">Explore →</span>
              </div>
            </Link>

            {/* Seasonal Collection */}
            <Link 
              to="/new-season" 
              className="group relative overflow-hidden rounded-sm bg-burgundy-dark/30 border border-gold/20 hover:border-gold/50 transition-all duration-500"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-burgundy-dark to-burgundy flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-serif text-gold mb-3 group-hover:scale-105 transition-transform duration-300">
                    New Season
                  </h3>
                  <p className="text-warmWhite/70 text-sm">
                    Latest arrivals
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-gold text-sm uppercase tracking-wider">Explore →</span>
              </div>
            </Link>

            {/* Special Collection */}
            <Link 
              to="/collections?filter=special" 
              className="group relative overflow-hidden rounded-sm bg-charcoal-light border border-gold/20 hover:border-gold/50 transition-all duration-500"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-charcoal to-gold/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-serif text-gold mb-3 group-hover:scale-105 transition-transform duration-300">
                    Special
                  </h3>
                  <p className="text-warmWhite/70 text-sm">
                    Exclusive pieces
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-gold text-sm uppercase tracking-wider">Explore →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="heading-section text-warmWhite mb-6">
                Italian Craftsmanship
              </h2>
              <p className="text-luxury mb-6">
                Each piece in our collection is a testament to Italian artistry, 
                where centuries of tradition meet contemporary design. We source 
                only the finest materials and work with master craftsmen who 
                have dedicated their lives to perfecting their craft.
              </p>
              <p className="text-luxury mb-8">
                From the rolling hills of Tuscany to the ateliers of Milan, 
                ALVERRO represents the pinnacle of Italian luxury fashion.
              </p>
              <Link to="/about" className="btn-secondary inline-flex items-center gap-2">
                Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative aspect-square bg-gradient-to-br from-emerald-dark to-burgundy-dark rounded-sm border border-gold/20 flex items-center justify-center">
              <div className="text-center p-12">
                <div className="text-6xl font-serif text-gold/20 mb-4">"</div>
                <p className="text-warmWhite/80 italic text-lg font-serif">
                  Excellence is not a destination, it is a journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

