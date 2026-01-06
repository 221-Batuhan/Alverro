// Donna Editorial Images Data Structure
// Images are stored in /public/assets/donna/
// This structure allows for easy migration to backend/CMS

const generateImagePath = (index) => `/assets/donna/donna-${index}.png`;

const donnaImages = Array.from({ length: 52 }, (_, i) => ({
  id: `donna-${i + 1}`,
  imageUrl: generateImagePath(i + 1),
  order: i + 1,
  season: 'SS24', // Can be updated per image
  collection: 'Donna', // Can be updated per image
  // Optional metadata for future expansion
  alt: `Donna Collection ${i + 1}`,
  // For masonry layout - can specify aspect ratios or sizes
  aspectRatio: null, // null = auto, or specify like '3/4', '4/5', '1/1', etc.
  featured: i < 6, // First 6 images as featured
}));

export default donnaImages;

