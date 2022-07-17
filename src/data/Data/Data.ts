import { NHLFeedData } from "../Game";
import { NHLFeedShift } from "../Shift";
import { DataPlayerType } from './interface'

class Data {
  constructor(public game: NHLFeedData, private shifts: NHLFeedShift[]) {}

  get game_id() {
    return this.game.gamePk;
  }

  get players() {
    return {
      home: Object.values(this.game.liveData.boxscore.teams.home.players).map(player => ({
        id: player.person.id,
        vitals: player.person,
        stats: player.stats.skaterStats || player.stats.goalieStats,
        position: player.position,
        number: Number(player.jerseyNumber)
      })),
      away: Object.values(this.game.liveData.boxscore.teams.away.players).map(player => ({
        id: player.person.id,
        vitals: player.person,
        stats: player.stats.skaterStats || player.stats.goalieStats,
        position: player.position,
        number: Number(player.jerseyNumber)
      }))
    }
  }

  get starting_goalies() {
    return {
      home: this.game.liveData.boxscore.teams.home.goalies[this.game.liveData.boxscore.teams.home.goalies.length - 1],
      away: this.game.liveData.boxscore.teams.away.goalies[this.game.liveData.boxscore.teams.away.goalies.length - 1]
    }
  }

  get officials() {
    return this.game.liveData.boxscore.officials;
  }

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