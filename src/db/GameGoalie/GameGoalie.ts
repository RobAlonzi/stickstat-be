import db, { format } from '@/db';
import DBTable from '@/db/DBTable';
import { DBGameGoalieItem } from './interface';


class DBGameGoalie implements DBTable<DBGameGoalieItem> {
  TABLE_NAME = 'game_goalie_stats';
  PRIMARY_KEY = 'player_id';
  SECONDARY_KEY = 'game_id';

  constructor(private props: DBGameGoalieItem) {}

  async upsert(): Promise<DBGameGoalieItem> {
    const db_item = await this.find();

    if(!db_item) {
      return this.insert()
    }

    if(this.needsUpdate(db_item)) {
      return this.update().then(() => this.props);
    }

    return this.props;
  }

  find(): Promise<DBGameGoalieItem | undefined> {
    return new Promise((res, rej) => {
      db.query(
      "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
      [this.TABLE_NAME, this.PRIMARY_KEY, this.props.player_id, this.SECONDARY_KEY, this.props.game_id],
      (err, results) => {
        if(err) rej(err);
        res(results[0]);
      })
    })
  }

  insert(): Promise<DBGameGoalieItem> {
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

  update(): Promise<void> {
    return new Promise((res, rej) => {
      const sql = format(
        "UPDATE ?? SET ? WHERE ?? = ? AND ?? = ?",
        [this.TABLE_NAME, this.props, this.PRIMARY_KEY, this.props.player_id, this.SECONDARY_KEY, this.props.game_id]
      )

      db.query(sql, (err) => {
        if(err) { rej(err) }
        res();
      })
    })
  }

  needsUpdate(prev: DBGameGoalieItem): boolean {
    return Object.entries(this.props).some(([key, value]) => prev[key as keyof DBGameGoalieItem] !== value);
  }
}

export default DBGameGoalie;