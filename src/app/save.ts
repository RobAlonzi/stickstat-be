import Data from '../data/Data';
import saveTeams from './team';
import saveVenues from './venue';
import saveGame from './game';
import saveCoach from './coaches';
import saveOfficials from './officials';
import savePlayer from './players';

async function parse(data: Data) {
  const queue: Promise<any>[] = [];

  debugger;

  // Teams
  queue.push(saveTeams(data.teams.home, data.teams.away));

  // Venues
  queue.push(saveVenues(
    { ...data.teams.home.venue, team_id: data.teams.home.id },
    { ...data.teams.away.venue, team_id: data.teams.away.id }
  ));

  // Coaches
  data.coaches.home.forEach(async coach => queue.push(saveCoach(
    coach,
    {
      game_id: data.game_id,
      team_id: data.teams.home.id,
      opponent_id: data.teams.away.id,
      home_away: 'home'
    }
  )));

  data.coaches.away.forEach(async coach => queue.push(saveCoach(
    coach,
    {
      game_id: data.game_id,
      team_id: data.teams.away.id,
      opponent_id: data.teams.home.id,
      home_away: 'away'
    }
  )));

  // Player Stats
  data.players.home.forEach(async player => queue.push(savePlayer(
    player,
    {
      game_id: data.game_id,
      team_id: data.teams.home.id,
      opponent_id: data.teams.away.id,
      is_starter: data.starting_goalies.home === player.id,
      home_away: 'home'
    }
  )))

  data.players.away.forEach(async player => queue.push(savePlayer(
    player,
    {
      game_id: data.game_id,
      team_id: data.teams.away.id,
      opponent_id: data.teams.home.id,
      is_starter: data.starting_goalies.away === player.id,
      home_away: 'away'
    }
  )))

  // Officials


  // // TODO: pull in home_venue / team ids here? But why would they change?
  // const game = await saveGame(data.game);


  // const officials = await saveOfficials(data.officials);

  

  const res = await Promise.all(queue);
  debugger;
}

export default parse;