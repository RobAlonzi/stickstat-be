import db from '@/db';
import DBTable from '@/db/DBTable';
import { DBPositionItem } from './interface';

class DBPosition implements DBTable<DBPositionItem> {
  TABLE_NAME = 'positions';
  PRIMARY_KEY = 'code';

  constructor(private props: DBPositionItem) {}

  async upsert(): Promise<DBPositionItem> {
    const db_item = await this.find();

    if(!db_item) {
      return this.insert()
    }

    if(this.needsUpdate(db_item)) {
      return this.update()
    }

    return this.props;
  }

  find(): Promise<DBPositionItem | undefined> {
    return new Promise((res, rej) => {
      db.query(
      "SELECT * FROM ?? WHERE ?? = ?",
      [this.TABLE_NAME, this.PRIMARY_KEY, this.props.code],
      (err, results) => {
        if(err) {
          rej(err);
          return;
        }
        res(results[0]);
      })
    })
  }

  insert(): Promise<DBPositionItem> {
    return new Promise((res, rej) => {
      db.query(
      "INSERT INTO ?? SET ?",
      [this.TABLE_NAME, this.props],
      (err) => {
        if(err) {
          rej(err);
          return;
        }
        res(this.props);
      })
    })
  }

  update(): Promise<DBPositionItem> {
    return new Promise((res, rej) => {
      db.query(
      "UPDATE ?? SET ? WHERE ?? = ?",
      [this.TABLE_NAME, this.props, this.PRIMARY_KEY,  this.props.code],
      (err) => {
        if(err) {
          rej(err);
          return;
        }
        res(this.props);
      })
    })
  }

  needsUpdate(prev: DBPositionItem): boolean {
    return Object.entries(this.props).some(([key, value]) => prev[key as keyof DBPositionItem] !== value);
  }
}

export default DBPosition;