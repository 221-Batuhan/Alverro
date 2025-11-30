import React, { useState } from "react";

const SizeGuide = () => {
  const [activeTab, setActiveTab] = useState("eu"); // 'eu' veya 'us'

  // Beden Tablosu Verileri
  const sizeData = {
    eu: {
      title: "European Sizing",
      unit: "cm",
      columns: ["Size", "Chest", "Waist", "Hips"],
      rows: [
        { size: "XS (44)", chest: "86-91", waist: "71-76", hips: "86-91" },
        { size: "S (46)", chest: "91-96", waist: "76-81", hips: "91-96" },
        { size: "M (48)", chest: "96-101", waist: "81-86", hips: "96-101" },
        { size: "L (50)", chest: "101-106", waist: "86-91", hips: "101-106" },
        { size: "XL (52)", chest: "106-111", waist: "91-96", hips: "106-111" },
        { size: "XXL (54)", chest: "111-116", waist: "96-101", hips: "111-116" },
      ]
    },
    us: {
      title: "US Sizing",
      unit: "inches",
      columns: ["Size", "Chest", "Waist", "Hips"],
      rows: [
        { size: "XS (34)", chest: "34-36", waist: "28-30", hips: "34-36" },
        { size: "S (36)", chest: "36-38", waist: "30-32", hips: "36-38" },
        { size: "M (38)", chest: "38-40", waist: "32-34", hips: "38-40" },
        { size: "L (40)", chest: "40-42", waist: "34-36", hips: "40-42" },
        { size: "XL (42)", chest: "42-44", waist: "36-38", hips: "42-44" },
        { size: "XXL (44)", chest: "44-46", waist: "38-40", hips: "44-46" },
      ]
    }
  };

  const currentData = sizeData[activeTab];

  return (
    <div className="relative min-h-screen bg-charcoal">
      {/* Hero Section - Minimalist Başlık */}
      <section className="relative pt-32 pb-16 text-center">
        <div className="container-luxury">
          <div className="animate-fade-in">
            <h1 className="heading-hero text-warmWhite mb-4">Size Guide</h1>
            <p className="text-luxury text-lg max-w-2xl mx-auto">
              Find your perfect fit. Tailored to perfection, designed for comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Selection & Table Section */}
      <section className="pb-24 animate-slide-up">
        <div className="container-luxury max-w-4xl mx-auto">
          
          {/* Bölge Seçimi (Toggle) */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-charcoal-light border border-white/10 p-1 rounded-sm">
              <button
                onClick={() => setActiveTab("eu")}
                className={`px-8 py-3 text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "eu"
                    ? "bg-gold text-charcoal font-medium shadow-lg"
                    : "text-warmWhite/60 hover:text-gold hover:bg-white/5"
                }`}
              >
                Europe (CM)
              </button>
              <button
                onClick={() => setActiveTab("us")}
                className={`px-8 py-3 text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "us"
                    ? "bg-gold text-charcoal font-medium shadow-lg"
                    : "text-warmWhite/60 hover:text-gold hover:bg-white/5"
                }`}
              >
                United States (IN)
              </button>
            </div>
          </div>

          {/* Tablo */}
          <div className="bg-charcoal-light border border-gold/20 rounded-sm p-8 md:p-12 relative overflow-hidden group">
            {/* Dekoratif Arka Plan Efekti */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-dark/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                <h2 className="text-2xl font-serif text-warmWhite">
                  {currentData.title}
                </h2>
                <span className="text-gold text-sm font-mono opacity-80">
                  Unit: {currentData.unit}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      {currentData.columns.map((col, index) => (
                        <th 
                          key={index} 
                          className="pb-6 text-gold font-serif text-lg border-b border-gold/10 font-normal"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-warmWhite/80">
                    {currentData.rows.map((row, rowIndex) => (
                      <tr 
                        key={rowIndex} 
                        className="group/row hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                      >
                        <td className="py-5 font-medium text-warmWhite">{row.size}</td>
                        <td className="py-5 font-mono text-sm">{row.chest}</td>
                        <td className="py-5 font-mono text-sm">{row.waist}</td>
                        <td className="py-5 font-mono text-sm">{row.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Measuring Tips - Ekstra Bilgi Alanı */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="p-6 border border-white/5 rounded-sm">
              <h3 className="text-gold font-serif text-lg mb-2">Chest</h3>
              <p className="text-luxury text-sm">
                Measure around the fullest part of your chest, keeping the tape horizontal.
              </p>
            </div>
            <div className="p-6 border border-white/5 rounded-sm">
              <h3 className="text-gold font-serif text-lg mb-2">Waist</h3>
              <p className="text-luxury text-sm">
                Measure around the narrowest part (typically where your body bends side to side).
              </p>
            </div>
            <div className="p-6 border border-white/5 rounded-sm">
              <h3 className="text-gold font-serif text-lg mb-2">Hips</h3>
              <p className="text-luxury text-sm">
                Measure around the fullest part of your hips, keeping the tape horizontal.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default SizeGuide;