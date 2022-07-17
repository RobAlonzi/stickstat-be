import db, { OkPacket } from '@/db';
import DBTable from '@/db/DBTable';
import { DBCoachItem } from './interface';


class DBCoach implements DBTable<DBCoachItem> {
  TABLE_NAME = 'coaches';

  constructor(private props: Omit<DBCoachItem, 'id'>) {}

  async upsert(): Promise<DBCoachItem> {
    const db_item = await this.find();

    if(!db_item) {
      return this.insert()
    }

    if(this.needsUpdate(db_item)) {
      return this.update()
    }

    if(db_item) {
      return db_item;
    }

    // TODO: error out!
    return { id: -1, ...this.props };
  }

  find(): Promise<DBCoachItem | undefined> {
    return new Promise((res, rej) => {
      db.query(
      "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
      [this.TABLE_NAME, 'first_name', this.props.first_name, 'last_name', this.props.last_name],
      (err, results) => {
        if(err) rej(err);
        res(results[0]);
      })
    })
  }

  insert(): Promise<DBCoachItem> {
    return new Promise((res, rej) => {
      db.query(
      "INSERT INTO ?? SET ?",
      [this.TABLE_NAME, this.props],
      (err, results: OkPacket) => {
        if(err) {
          rej(err);
          return;
        }

        res({ id: results.insertId, ...this.props });
      })
    })
  }

  update(): Promise<DBCoachItem> {
    return new Promise((res, rej) => {
      db.query(
      "UPDATE ?? SET ? WHERE ?? = ? AND ?? = ?",
      [this.TABLE_NAME, this.props, 'first_name', this.props.first_name, 'last_name', this.props.last_name],
      async (err, results: OkPacket) => {
        if(err) {
          rej(err);
          return;
        }
        
        const coach = await this.find();
        res(coach!);
      })
    })
  }

  needsUpdate(prev: DBCoachItem): boolean {
    return Object.entries(this.props).some(([key, value]) => prev[key as keyof DBCoachItem] !== value);
  }
}

export default DBCoach;