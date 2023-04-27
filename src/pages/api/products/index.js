import db from '@utils/db';
import Product from '../../../models/Product';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find()
    .populate('category')
    .populate('brand')
    .populate('season');
  await db.disconnect();
  res.send(products);
};

const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    ...(req.body ?? {}),
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Product created successfully', product });
};

export default handler;
