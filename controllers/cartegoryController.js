const db = require('../db/cartegoryQueries');

const createCartegory = async (req, res) => {
  try {
    const {name, description} = req.body;
    const cartegoryId = await db.createCartegory(name, description);
    res.status(200).json({ message: 'Cartegory created successfully'})
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const getCartegories = async (req, res) => {
  try {
    const cartegories = db.getCartegories();
    res.status(200).json(cartegories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
};


module.exports = {
  createCartegory,
  getCartegories,
}