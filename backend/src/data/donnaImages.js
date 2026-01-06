// Donna Editorial Images Data Structure
// This mirrors the frontend structure for consistency
// In production, this would be replaced with database queries

const generateImagePath = (index) => `/assets/donna/donna-${index}.png`;

const donnaImages = Array.from({ length: 52 }, (_, i) => ({
  id: `donna-${i + 1}`,
  imageUrl: generateImagePath(i + 1),
  order: i + 1,
  season: 'SS24',
  collection: 'Donna',
  alt: `Donna Collection ${i + 1}`,
  aspectRatio: null,
  featured: i < 6,
}));

module.exports = donnaImages;

