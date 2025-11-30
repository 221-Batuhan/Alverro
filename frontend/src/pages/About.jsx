import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="relative">
      {/* Hero Section - Home.jsx ile uyumlu başlık alanı */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-light via-charcoal to-charcoal">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A86A' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container-luxury relative z-10 text-center mt-10">
          <div className="animate-fade-in">
            <h1 className="heading-hero text-warmWhite mb-6">
              The Alverro <span className="text-gold">Legacy</span>
            </h1>
            <p className="text-luxury text-lg max-w-2xl mx-auto">
              Born from a passion for Italian artistry, dedicated to modern sophistication.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section - Hikaye Bölümü */}
      <section className="section-padding bg-charcoal-light border-t border-white/5">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Sol taraf: Görsel temsili (Gradyan kutu) */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-gold/20 group animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark to-charcoal opacity-80 transition-opacity group-hover:opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="font-serif text-9xl text-gold/10 select-none">A</span>
              </div>
              {/* Dekoratif çizgi */}
              <div className="absolute bottom-8 left-8 right-8 h-[1px] bg-gold/30"></div>
            </div>

            {/* Sağ Taraf: Metin */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="heading-section text-warmWhite mb-6">
                Our Heritage
              </h2>
              <div className="space-y-6 text-luxury">
                <p>
                  Founded in the heart of Milan, ALVERRO began with a simple yet ambitious vision: 
                  to redefine luxury by blending centuries-old Italian tailoring traditions with 
                  contemporary aesthetics.
                </p>
                <p>
                  Every stitch tells a story of dedication. We believe that true luxury lies not just 
                  in the brand name, but in the silence of perfection—the feeling of premium fabric, 
                  the precision of a cut, and the timeless elegance that never fades.
                </p>
                <p className="text-gold italic font-serif text-lg pt-4">
                  "We don't just design clothes; we curate confidence."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Değerlerimiz */}
      <section className="section-padding bg-charcoal relative overflow-hidden">
        {/* Arka plan efekti */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-dark/10 blur-3xl rounded-full"></div>

        <div className="container-luxury relative z-10">
          <div className="text-center mb-16">
            <h2 className="heading-section text-warmWhite mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-gold/50 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Craftsmanship", desc: "Hand-finished details by master artisans in Italy." },
              { title: "Sustainability", desc: "Ethically sourced materials and responsible production." },
              { title: "Timelessness", desc: "Designs that transcend seasons and trends." }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group p-8 bg-charcoal-light border border-white/5 hover:border-gold/30 transition-all duration-300 rounded-sm"
              >
                <div className="w-12 h-12 rounded-full bg-charcoal border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                  <CheckCircle className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-serif text-warmWhite mb-3">{item.title}</h3>
                <p className="text-luxury text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-emerald-dark to-charcoal text-center border-t border-gold/10">
        <div className="container-luxury animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-serif text-warmWhite mb-6">
            Experience the Difference
          </h2>
          <p className="text-luxury mb-8 max-w-xl mx-auto">
            Join us in our journey of redefining elegance. Explore our latest collection today.
          </p>
          <Link 
            to="/shop" 
            className="btn-primary inline-flex items-center gap-2 group px-8 py-4 bg-gold hover:bg-gold-light text-charcoal font-medium rounded-sm transition-all"
          >
            View Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;