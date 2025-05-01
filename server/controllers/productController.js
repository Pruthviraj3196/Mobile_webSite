const Product = require('../models/Product');
const User = require('../models/User');

exports.getAllProducts = async (req, res) => {
  const { adminName } = req.query;
  if (adminName) {
    const user = await User.findOne({ email: adminName });
    if (!user) return res.json([]);
    const products = await Product.find({ createdBy: user._id });
    return res.json(products);
  }
  const products = await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, createdBy: req.user._id });
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true }
  );
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  res.json({ message: 'Deleted' });
};
