"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[100svh] w-full relative">
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#1F2D3D] to-[#1A3B3C]" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container-page text-center fade-in">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="heading-serif text-4xl sm:text-6xl md:text-7xl text-white"
          >
            Alvérro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-4 text-white/90 text-base sm:text-lg"
          >
            Wear Your Legacy
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <Link
              href="/collections"
              className="rounded-full bg-white text-[#1F2D3D] px-6 py-3 text-sm font-medium hover:bg-white/90 transition"
            >
              Explore Collections
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/70 text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
