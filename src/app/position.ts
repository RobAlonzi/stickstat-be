import { PositionItem } from '@/data/interface';
import DBPosition, { DBPositionItem } from '@/db/Position';

async function savePosition(position: PositionItem): Promise<DBPositionItem> {
  const db_position = new DBPosition(position)
  return db_position.upsert();
}

export default savePosition;