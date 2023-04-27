import db from '@utils/db';
import Brand from '../../models/Brand';

const handler = async (req, res) => {
  await db.connect();
  const brands = await Brand.find();
  await db.disconnect();
  res.send(brands);
};

export default handler;
