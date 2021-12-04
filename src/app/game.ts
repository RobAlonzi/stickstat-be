
import { NHLFeedData } from '@/data/Game';
import DBGame, { DBGameItem } from '@/db/Game';

async function saveGame({ gameData, liveData }: NHLFeedData): Promise<DBGameItem> {
  const db_game = new DBGame({
    id: gameData.game.pk,
    season: gameData.game.season,
    type: gameData.game.type,
    status: gameData.status.abstractGameState,
    home_id: gameData.teams.home.id,
    away_id: gameData.teams.away.id,
    start_time: gameData.datetime.dateTime,
    end_time: gameData.datetime.endDateTime,
    venue_id: gameData.venue.id,
    home_score: liveData.linescore.teams.home.goals,
    away_score: liveData.linescore.teams.away.goals,
    is_shootout: liveData.linescore.hasShootout,
  })

 return db_game.upsert();
}


export default saveGame;