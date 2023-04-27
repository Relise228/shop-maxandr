import db from '@utils/db';
import Category from '../../models/Category';

const handler = async (req, res) => {
  await db.connect();
  const categories = await Category.find();
  await db.disconnect();
  res.send(categories);
};

export default handler;
