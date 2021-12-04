
import { NHLFeedLiveDataBoxscoreTeamCoaches } from '@/data/Game';
import DBCoach, { DBCoachItem } from '@/db/Coach';
import savePosition from './position';

interface Props extends NHLFeedLiveDataBoxscoreTeamCoaches {
  team_id: number;
}

async function saveCoaches(coaches: Props[]): Promise<DBCoachItem[]> {
  const db_coaches: DBCoachItem[] = [];

  for(const coach of coaches) {
    const position = await savePosition(coach.position);
    const db_coach = await saveCoach({ ...coach, position });
    db_coaches.push(db_coach);
  }

  return db_coaches;
}

async function saveCoach(coach: Props): Promise<any> {
  const [first_name, ...last_name] = coach.person.fullName.split(' ');

 const db_coach = new DBCoach({
   first_name,
   last_name: last_name.join(' '),
   position: coach.position.code,
   team_id: coach.team_id,
 })

 return db_coach.upsert();
}


export default saveCoaches;