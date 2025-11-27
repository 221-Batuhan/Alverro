const COLLECTIONS_DATA = require('../data/collections');

exports.getSeasons = (req, res) => {
  const seasons = Object.keys(COLLECTIONS_DATA).map(key => ({ slug: key, name: COLLECTIONS_DATA[key].name }));
  res.json(seasons);
};

exports.getCategoriesBySeason = (req, res) => {
  const { season } = req.params;
  const data = COLLECTIONS_DATA[season];
  if (!data) return res.status(404).json({ error: 'Season not found' });
  res.json(data.categories);
};

exports.getCategoryDetail = (req, res) => {
  const { season, category } = req.params;
  const data = COLLECTIONS_DATA[season];
  if (!data) return res.status(404).json({ error: 'Season not found' });
  const cat = data.categories.find(c => c.slug === category);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  res.json(cat);
};
