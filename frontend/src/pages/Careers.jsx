import React from 'react';
import { Mail, Star, Globe, Heart } from 'lucide-react';

const Careers = () => {
  return (
    <div className="relative min-h-screen bg-charcoal">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 border-b border-gold/10">
        <div className="container-luxury text-center">
          <div className="animate-fade-in">
            <span className="text-gold uppercase tracking-[0.3em] text-sm mb-4 block">Careers</span>
            <h1 className="heading-hero text-warmWhite mb-6">
              Join the <span className="text-gold">Legacy</span>
            </h1>
            <p className="text-luxury text-lg max-w-2xl mx-auto">
              At ALVERRO, we don't just hire employees; we welcome artisans, visionaries, and storytellers into our historic Italian house.
            </p>
          </div>
        </div>
      </section>

      {/* Why Alverro Section */}
      <section className="section-padding bg-charcoal-light">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-section text-warmWhite mb-8">Why ALVERRO?</h2>
              <div className="space-y-6 text-luxury">
                <p>
                  Working at ALVERRO means being part of a tradition that values the "silence of perfection." We provide an environment where Italian craftsmanship meets modern innovation, allowing our team to push the boundaries of luxury fashion.
                </p>
                <p>
                  We believe in nurturing talent through mentorship from master artisans and providing a workspace that inspires creativity and excellence every day.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Star, title: "Excellence", desc: "A commitment to the highest standards." },
                { icon: Heart, title: "Passion", desc: "For heritage and contemporary design." },
                { icon: Globe, title: "Culture", desc: "A diverse, inclusive Italian spirit." },
                { icon: Star, title: "Growth", desc: "Continuous learning and development." }
              ].map((item, index) => (
                <div key={index} className="p-6 bg-charcoal border border-gold/10 rounded-sm">
                  <item.icon className="w-6 h-6 text-gold mb-4" />
                  <h3 className="text-warmWhite font-serif mb-2">{item.title}</h3>
                  <p className="text-warmWhite/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury text-center">
          <h2 className="heading-section text-warmWhite mb-12">Opportunities</h2>
          <div className="max-w-3xl mx-auto text-luxury mb-16">
            <p className="mb-8">
              We are always looking for exceptional individuals in the following areas:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Design & Creative', 'Artisanal Craft', 'Retail Excellence', 'Brand Marketing', 'Digital Innovation'].map((dept) => (
                <span key={dept} className="px-6 py-2 border border-emerald/20 text-warmWhite/80 rounded-full text-sm">
                  {dept}
                </span>
              ))}
            </div>
          </div>

          {/* Contact / Application Section */}
          <div className="bg-charcoal-light border border-gold/20 p-12 rounded-sm max-w-4xl mx-auto">
            <Mail className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-warmWhite mb-4">How to Apply</h2>
            <p className="text-luxury mb-8">
              We prefer the personal touch. If you believe your vision aligns with the ALVERRO legacy, 
              please send your CV and portfolio directly to our heritage team.
            </p>
            <a 
              href="mailto:alverro@gmail.com" 
              className="text-2xl md:text-3xl font-serif text-gold hover:text-gold-light transition-colors break-all"
            >
              alverro@gmail.com
            </a>
            <p className="text-warmWhite/40 text-sm mt-8 uppercase tracking-widest">
              Milan • Florence • International
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;