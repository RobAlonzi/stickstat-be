
import db from '@/db';
import DBTable from '@/db/DBTable';
import { DBVenueItem } from './interface';


class DBVenue implements DBTable<DBVenueItem> {
  TABLE_NAME = 'venues';
  PRIMARY_KEY = 'id';

  constructor(private props: DBVenueItem) {}

  async upsert(): Promise<DBVenueItem> {
    const db_item = await this.find();

    if(!db_item) {
      return this.insert()
    }

    if(this.needsUpdate(db_item)) {
      return this.update()
    }

    return this.props;
  }

  find(): Promise<DBVenueItem | undefined> {
    return new Promise((res, rej) => {
      db.query(
      "SELECT * FROM ?? WHERE ?? = ?",
      [this.TABLE_NAME, this.PRIMARY_KEY, this.props.id],
      (err, results) => {
        if(err) {
          rej(err);
          return;
        }
        res(results[0]);
      })
    })
  }

  insert(): Promise<DBVenueItem> {
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

  update(): Promise<DBVenueItem> {
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

  needsUpdate(prev: DBVenueItem): boolean {
    return Object.entries(this.props).some(([key, value]) => prev[key as keyof DBVenueItem] !== value);
  }
}

export default DBVenue;