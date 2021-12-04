import { NHLFeedData } from "../Game";
import { NHLFeedShift } from "../Shift";

class Data {
  constructor(public game: NHLFeedData, private shifts: NHLFeedShift[]) {}

  get teams() {
    return {
      home: this.game.gameData.teams.home,
      away: this.game.gameData.teams.away,
    }
  }

  get coaches() {
    return {
      home: this.game.liveData.boxscore.teams.home.coaches,
      away: this.game.liveData.boxscore.teams.away.coaches
    }
  }
}

export default Data;