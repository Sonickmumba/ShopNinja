const db = require('../db/categoryQueries');

const createCartegory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const cartegoryId = await db.createCartegory(name, description);
    res.status(200).json({ message: 'Cartegory created successfully', cartegoryId})
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const getCartegories = async (req, res) => {
  try {
    const cartegories = await db.getCartegories();
    console.log('trying to get cartegories')
    res.status(200).json(cartegories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error mmm'})
  }
};


module.exports = {
  createCartegory,
  getCartegories,
}