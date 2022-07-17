import db from '@/db';
import DBTable from '@/db/DBTable';
import { DBGameCoachItem } from './interface';


class DBGame implements DBTable<DBGameCoachItem> {
  TABLE_NAME = 'game_coaches';
  PRIMARY_KEY = 'coach_id';
  SECONDARY_KEY = 'game_id';

  constructor(private props: DBGameCoachItem) {}

  async upsert(): Promise<DBGameCoachItem> {
    const db_item = await this.find();

    if(!db_item) {
      return this.insert()
    }

    if(this.needsUpdate(db_item)) {
      return this.update()
    }

    return this.props;
  }

  find(): Promise<DBGameCoachItem | undefined> {
    return new Promise((res, rej) => {
      db.query(
      "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
      [this.TABLE_NAME, this.PRIMARY_KEY, this.props.coach_id, this.SECONDARY_KEY, this.props.game_id],
      (err, results) => {
        if(err) rej(err);
        res(results[0]);
      })
    })
  }

  insert(): Promise<DBGameCoachItem> {
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

  update(): Promise<DBGameCoachItem> {
    return new Promise((res, rej) => {
      db.query(
      "UPDATE ?? SET ? WHERE ?? = ? AND ?? = ?",
      [this.TABLE_NAME, this.props, this.PRIMARY_KEY, this.props.coach_id, this.SECONDARY_KEY, this.props.game_id],
      (err) => {
        if(err) {
          rej(err);
          return;
        }

        res(this.props);
      })
    })
  }

  needsUpdate(prev: DBGameCoachItem): boolean {
    return Object.entries(this.props).some(([key, value]) => prev[key as keyof DBGameCoachItem] !== value);
  }
}

export default DBGame;