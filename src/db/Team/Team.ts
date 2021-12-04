import db from '@/db';
import DBTable from '@/db/DBTable';
import { DBTeamItem } from './interface';


class DBTeam implements DBTable<DBTeamItem> {
  TABLE_NAME = 'teams';
  PRIMARY_KEY = 'id';

  constructor(private props: DBTeamItem) {}

  async upsert(): Promise<DBTeamItem> {
    const db_item = await this.find();

    if(!db_item) {
      return this.insert()
    }

    if(this.needsUpdate(db_item)) {
      return this.update()
    }

    return this.props;
  }

  find(): Promise<DBTeamItem | undefined> {
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

  insert(): Promise<DBTeamItem> {
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

  update(): Promise<DBTeamItem> {
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

  needsUpdate(prev: DBTeamItem): boolean {
    return Object.entries(this.props).some(([key, value]) => prev[key as keyof DBTeamItem] !== value);
  }
}

export default DBTeam;