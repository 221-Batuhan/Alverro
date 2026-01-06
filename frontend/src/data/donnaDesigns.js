// Donna Designs Data Structure
// Structured for easy backend migration

const generateImagePath = (index) => `/assets/donna/donna-${index}.png`;

// Collection definitions with slugs
const COLLECTION_MAP = {
  'Midnight Star': { name: 'Midnight Star', slug: 'midnight-star' },
  'Ancient Beauty': { name: 'Ancient Beauty', slug: 'ancient-beauty' },
  '21st Century': { name: '21st Century', slug: '21st-century' },
  'Timeless Elegance': { name: 'Timeless Elegance', slug: 'timeless-elegance' },
  'Bridal Collection': { name: 'Bridal Collection', slug: 'bridal' },
  'Shoes': { name: 'Shoes', slug: 'shoes' },
};

const getCollectionByIndex = (index) => {
  // Strict index-based collection assignment
  // donna-1 to donna-10 → Midnight Star
  // donna-11 to donna-20 → Ancient Beauty
  // donna-21 to donna-30 → 21st Century
  // donna-31 to donna-40 → Timeless Elegance
  // donna-41 to donna-50 → Bridal Collection
  // donna-51 to donna-60 → Shoes
  if (index <= 10 && index >= 1) return { name: 'Midnight Star', slug: 'midnight-star' };
  if (index <= 17 && index >= 11) return { name: 'Ancient Beauty', slug: 'ancient-beauty' };
  if (index <= 29 && index >= 21) return { name: '21st Century', slug: '21st-century' };
  if (index <= 39 && index >= 31) return { name: 'Timeless Elegance', slug: 'timeless-elegance' };
  if (index <= 48 && index >= 41) return { name: 'Bridal Collection', slug: 'bridal' };
  if (index <= 57 && index >= 51) return { name: 'Shoes', slug: 'shoes' };
  return {}; // 51-60
};

const donnaDesigns = Array.from({ length: 60 }, (_, i) => {
  const index = i + 1;
  const isDress = index <= 50; // Items 1-50 are dresses, items 51-60 are shoes
  const collection = getCollectionByIndex(index);
  
  return {
    id: `donna-${index}`,
    name: isDress 
      ? `Donna Dress ${index}` 
      : `Donna Shoe ${index - 50}`,
    imageUrl: generateImagePath(index),
    category: isDress ? 'dress' : 'shoe',
    collection: collection.name,
    collectionSlug: collection.slug,
    order: index,
    details: {
      fabricComposition: isDress
        ? '100% Italian silk, hand-finished'
        : 'Premium Italian leather, hand-crafted sole',
      fitDescription: isDress
        ? 'Relaxed fit, flowing silhouette, midi length'
        : 'True to size, comfortable heel, elegant profile',
      craftsmanship: isDress
        ? 'Hand-stitched seams, couture finishing, made in Florence'
        : 'Hand-lasted construction, artisanal detailing, made in Milan',
      seasonalNotes: index <= 13 
        ? 'Timeless - La Pulga Collection'
        : index <= 26
        ? 'Fall/Winter 2024 collection'
        : 'Year-round elegance',
    },
  };
});

export default donnaDesigns;
export { COLLECTION_MAP };

