const donnaImages = require('../data/donnaImages');

/**
 * @desc    Get Donna editorial images
 * @route   GET /api/donna/images
 * @access  Public
 */
exports.getDonnaImages = async (req, res) => {
  try {
    const { season, collection, featured } = req.query;

    let images = donnaImages;

    // Filter by season if provided
    if (season) {
      images = images.filter(img => img.season === season);
    }

    // Filter by collection if provided
    if (collection) {
      images = images.filter(img => img.collection === collection);
    }

    // Filter by featured if provided
    if (featured === 'true') {
      images = images.filter(img => img.featured === true);
    }

    // Sort by order
    images.sort((a, b) => a.order - b.order);

    res.status(200).json({
      success: true,
      count: images.length,
      images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get single Donna image by ID
 * @route   GET /api/donna/images/:id
 * @access  Public
 */
exports.getDonnaImage = async (req, res) => {
  try {
    const image = donnaImages.find(img => img.id === req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    res.status(200).json({
      success: true,
      image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

