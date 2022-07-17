import Player, { NHLFeedPlayer } from '@/data/Player';
import { DataPlayerType } from '@/data/Data';
import DBPlayer, { DBPlayerItem } from '@/db/Player';
import DBGameSkater from '@/db/GameSkater';
import DBGameGoalie from '@/db/GameGoalie';
import { fetchAndSaveTeam } from './team';
import savePosition from './position';
import { NHLFeedLiveDataBoxscoreTeamSkaterStats, NHLFeedLiveDataBoxscoreTeamGoalieStats } from '@/data/Game';


interface Meta {
  game_id: number;
  team_id: number;
  opponent_id: number;
  is_starter: boolean;
  home_away: 'home' | 'away';
}

async function savePlayer(player: DataPlayerType, meta: Meta): Promise<void> {

  await fetchAndSavePlayer(player);

  if(player.position.code === 'G') {
    await saveGoalieGameToDB(player, meta);
    return;
  }

  await saveSkaterGameToDB(player, meta);
  return;
}

async function fetchAndSavePlayer(player: DataPlayerType): Promise<void> {
  const player_data = await new Player(player.id).fetch();

  if(player_data.currentTeam) {
    await fetchAndSaveTeam(player_data.currentTeam.id);
  }

  await savePosition(player.position);
  
  if(player_data.primaryPosition.code !== player.position.code) {
    await savePosition(player_data.primaryPosition);
  }

  await savePlayerToDB(player_data)

}

async function savePlayerToDB(player: NHLFeedPlayer): Promise<DBPlayerItem> {
  const db_player = new DBPlayer({
    id: player.id,
    first_name: player.firstName,
    last_name: player.lastName,
    position: player.primaryPosition.code,
    team_id: player.currentTeam?.id || null,
    number: Number(player.primaryNumber),
    birth_date: player.birthDate,
    birth_city: player.birthCity,
    birth_state: player.birthStateProvince || null,
    birth_country: player.birthCountry,
    nationality: player.nationality,
    height: convertFeetToInches(player.height),
    weight: player.weight,
    handedness: player.shootsCatches,
    active: player.active,
    rookie: player.rookie,
  })

  return await db_player.upsert();
}

async function saveSkaterGameToDB(player: DataPlayerType, meta: Meta) {
  const stats = player.stats as NHLFeedLiveDataBoxscoreTeamSkaterStats | undefined;

  const skater = new DBGameSkater({
    game_id: meta.game_id,
    player_id: player.id,
    team_id: meta.team_id,
    opponent_id: meta.opponent_id,
    home_away: meta.home_away,
    position: player.position.code,
    jersey_number: player.number,
    toi: convertStringToSeconds(stats?.timeOnIce),
    ev_toi: convertStringToSeconds(stats?.evenTimeOnIce),
    pp_toi: convertStringToSeconds(stats?.powerPlayTimeOnIce),
    sh_toi: convertStringToSeconds(stats?.shortHandedTimeOnIce),
    assists: stats?.assists,
    goals: stats?.goals,
    shots: stats?.shots,
    hits: stats?.hits,
    pp_goals: stats?.powerPlayGoals,
    pp_assists: stats?.powerPlayAssists,
    pim: stats?.penaltyMinutes,
    faceoff_wins: stats?.faceOffWins,
    faceoff_taken: stats?.faceoffTaken,
    takeaways: stats?.takeaways,
    giveaways: stats?.giveaways,
    sh_goals: stats?.shortHandedGoals,
    sh_assists: stats?.shortHandedAssists,
    shots_blocked: stats?.blocked,
    plus_minus: stats?.plusMinus,
    is_scratch: stats === undefined,
  })

  return await skater.upsert();
}

async function saveGoalieGameToDB(player: DataPlayerType, meta: Meta) {
  const stats = player.stats as NHLFeedLiveDataBoxscoreTeamGoalieStats | undefined;

  const goalie = new DBGameGoalie({
    game_id: meta.game_id,
    player_id: player.id,
    team_id: meta.team_id,
    opponent_id: meta.opponent_id,
    home_away: meta.home_away,
    position: player.position.code,
    jersey_number: player.number,
    toi: convertStringToSeconds(stats?.timeOnIce),
    goals: stats?.goals,
    assists: stats?.assists,
    pim: stats?.pim,
    shots: stats?.shots,
    saves: stats?.saves,
    pp_saves: stats?.powerPlaySaves,
    ev_saves: stats?.evenSaves,
    sh_saves: stats?.shortHandedSaves,
    pp_shots_against: stats?.powerPlayShotsAgainst,
    sh_shots_against: stats?.shortHandedShotsAgainst,
    ev_shots_against: stats?.evenShotsAgainst,
    decision: stats?.decision.length ? stats.decision : undefined,
    is_scratch: stats === undefined,
    is_starter: meta.is_starter,
  })

  return await goalie.upsert();
}

// 6' 2"
function convertFeetToInches(value: string): number {
  const [feet, inches] = value.split("'")
  return (Number(feet) * 12) + Number(inches.trim().replace('"', ''));
}

// 2:59
function convertStringToSeconds(toi?: string): number | undefined {
  if(!toi) {
    return undefined;
  }

  const [minutes, seconds] = toi.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

export default savePlayer;