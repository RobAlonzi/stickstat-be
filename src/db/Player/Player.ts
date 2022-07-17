import db from '@/db';
import DBTable from '@/db/DBTable';
import { DBPlayerItem } from './interface';


class DBPlayer implements DBTable<DBPlayerItem> {
  TABLE_NAME = 'players';
  PRIMARY_KEY = 'id';

  constructor(private props: DBPlayerItem) {}

  async upsert(): Promise<DBPlayerItem> {
    const db_item = await this.find();

    if(!db_item) {
      return this.insert()
    }

    if(this.needsUpdate(db_item)) {
      return this.update()
    }

    return this.props;
  }

  find(): Promise<DBPlayerItem | undefined> {
    return new Promise((res, rej) => {
      db.query(
      "SELECT * FROM ?? WHERE ?? = ?",
      [this.TABLE_NAME, this.PRIMARY_KEY, this.props.id],
      (err, results) => {
        if(err) rej(err);
        res(results[0]);
      })
    })
  }

  insert(): Promise<DBPlayerItem> {
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

  update(): Promise<DBPlayerItem> {
    return new Promise((res, rej) => {
      db.query(
      "UPDATE ?? SET ? WHERE ?? = ?",
      [this.TABLE_NAME, this.props, this.PRIMARY_KEY,  this.props.id],
      (err) => {
        if(err) {
          rej(err);
          return;
        }

        res(this.props);
      })
    })
  }

  needsUpdate(prev: DBPlayerItem): boolean {
    return Object.entries(this.props).some(([key, value]) => prev[key as keyof DBPlayerItem] !== value);
  }
}

export default DBPlayer;
