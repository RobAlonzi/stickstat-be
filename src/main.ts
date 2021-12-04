import Data from './data/Data';
import Game from './data/Game';
import Shift from './data/Shift';
import save from './app/save';

import Player from './data/Player';
import Team from './data/Team';
import Official from './data/Official';


async function hello() {
  const game = new Game(2020020463);
  const shift = new Shift(2020020463);
  const game_data = await game.fetch();
  const shift_data = await shift.fetch();

  const data = new Data(game_data, shift_data);
  await save(data);

  // const player = new Player(8482245);
  // const player_data = await player.fetch();
  // const official = new Official(2275);
  // const official_data = await official.fetch();

  // const team = new Team(player_data.currentTeam.id);
  // const team_data = await team.fetch();

  // const team = new DBTeam({});
  // await team.upsert();
}

hello();


export default hello;