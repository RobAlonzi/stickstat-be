import db from '@/db';
import DBTable from '@/db/DBTable';
import { DBOfficialItem } from './interface';


class DBOfficial implements DBTable<DBOfficialItem> {
  TABLE_NAME = 'officials';
  PRIMARY_KEY = 'id';

  constructor(private props: DBOfficialItem) {}

  async upsert(): Promise<DBOfficialItem> {
    const db_item = await this.find();

    if(!db_item) {
      return this.insert()
    }

    if(this.needsUpdate(db_item)) {
      return this.update()
    }

    return this.props;
  }

  find(): Promise<DBOfficialItem | undefined> {
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

  insert(): Promise<DBOfficialItem> {
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

  update(): Promise<DBOfficialItem> {
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

  needsUpdate(prev: DBOfficialItem): boolean {
    return Object.entries(this.props).some(([key, value]) => prev[key as keyof DBOfficialItem] !== value);
  }
}

export default DBOfficial;
