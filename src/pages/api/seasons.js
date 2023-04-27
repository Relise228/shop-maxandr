import db from '@utils/db';
import Season from '../../models/Season';

const handler = async (req, res) => {
  await db.connect();
  const seasons = await Season.find();
  await db.disconnect();
  res.send(seasons);
};

export default handler;
