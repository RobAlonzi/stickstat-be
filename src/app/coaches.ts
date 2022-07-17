
import { NHLFeedLiveDataBoxscoreTeamCoaches } from '@/data/Game';
import DBCoach, { DBCoachItem } from '@/db/Coach';
import DBGameCoach, { DBGameCoachItem } from '@/db/GameCoach';
import savePosition from './position';

interface Meta {
  game_id: number;
  team_id: number;
  opponent_id: number;
  home_away: 'home' | 'away';
}

async function saveCoach(coach: NHLFeedLiveDataBoxscoreTeamCoaches, meta: Meta): Promise<void> {
  const position = await savePosition(coach.position);
  const db_coach = await saveCoachToDB(coach, meta.team_id, position.code);
  await saveCoachGameToDB(db_coach.id, meta);
  return;
}

async function saveCoachToDB(coach: NHLFeedLiveDataBoxscoreTeamCoaches, team_id: number, position_code: string): Promise<DBCoachItem> {
  const [first_name, ...last_name] = coach.person.fullName.split(' ');

 const db_coach = new DBCoach({
   first_name,
   last_name: last_name.join(' '),
   position: position_code,
   team_id,
 })

 return db_coach.upsert();
}

async function saveCoachGameToDB(coach_id: number, { game_id, team_id, opponent_id, home_away }: Meta): Promise<DBGameCoachItem> {
 const db_game_coach = new DBGameCoach({
   coach_id,
   game_id,
   team_id,
   opponent_id,
   home_away,
 })

 return db_game_coach.upsert();
}


export default saveCoach;