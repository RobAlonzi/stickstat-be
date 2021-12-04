import Data from '../data/Data';
import saveTeams from './team';
import saveVenues from './venue';
import saveGame from './game';
import saveCoaches from './coaches';

async function parse(data: Data) {
  // Saves that must come before Game is saved
  const [home_team, away_team] = await saveTeams(data.teams.home, data.teams.away);
  const [home_venue] = await saveVenues(
    { ...data.teams.home.venue, team_id: home_team.id },
    { ...data.teams.away.venue, team_id: away_team.id }
  );

  // TODO: pull in home_venue / team ids here? But why would they change?
  const game = await saveGame(data.game);

  // Doesn't need to come after game, but lets do it anyways
  const coaches = await saveCoaches([
    ...data.coaches.home.map(coach => ({ ...coach, team_id: home_team.id })),
    ...data.coaches.away.map(coach => ({ ...coach, team_id: away_team.id })),
  ])


  // const player = new Player(8482245);
  // const player_data = await player.fetch();
  // const official = new Official(2275);
  // const official_data = await official.fetch();

  // const team = new Team(player_data.currentTeam.id);
  // const team_data = await team.fetch();

  // const team = new DBTeam({});
  // await team.upsert();
}

export default parse;