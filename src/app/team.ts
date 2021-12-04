
import { NHLFeedGameDataTeam } from '@/data/Game';
import DBTeam, { DBTeamItem } from '@/db/Team';

async function saveTeams(home_team: NHLFeedGameDataTeam, away_team: NHLFeedGameDataTeam): Promise<DBTeamItem[]> {
  const db_home_team = await saveTeam(home_team);
  const db_away_team = await saveTeam(away_team);
  return [db_home_team, db_away_team];
}

async function saveTeam(team: NHLFeedGameDataTeam): Promise<DBTeamItem> {
 const db_team = new DBTeam({
    id: team.id,
    nickname: team.teamName,
    location: team.locationName,
    abbreviation: team.abbreviation,
    short_name: team.shortName,
    division: team.division.name
 })

 return db_team.upsert();
}


export default saveTeams;