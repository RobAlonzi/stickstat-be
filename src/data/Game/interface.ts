import { PositionItem } from '@/data/interface';

export interface NHLFeedData {
  copyright: string;
  gamePk: number;
  link: string;
  metaData: NHLFeedMetaData;
  gameData: NHLFeedGameData;
  liveData: NHLFeedLiveData;
}

export interface NHLFeedMetaData {
  wait: number;
  timeStamp: string;
}

export interface NHLFeedGameData {
  game: NHLFeedGameDataGame;
  datetime: NHLFeedGameDataDateTime;
  status: NHLFeedGameDataStatus;
  teams: {
    away: NHLFeedGameDataTeam;
    home: NHLFeedGameDataTeam;
  },
  players: {
    [id: string]: NHLFeedGameDataPlayer;
  }
  venue: NHLFeedGameDataVenue;
}

export interface NHLFeedGameDataGame {
  pk: number;
  season: string;
  type: string;
}

export interface NHLFeedGameDataDateTime {
  dateTime: string;
  endDateTime: string;
}

export interface NHLFeedGameDataStatus {
  abstractGameState: string;
  codedGameState: string;
  detailedState: string;
  statusCode: string;
  startTimeTBD: boolean;
}

export interface NHLFeedGameDataTeam {
  id: number;
  name: string;
  link: string;
  venue: NHLFeedGameDataTeamVenue;
  abbreviation: string;
  triCode: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: NHLFeedGameDataTeamDivision;
  conference: NHLFeedGameDataTeamConference;
  franchise: NHLFeedGameDataTeamFranchise;
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
}

export interface NHLFeedGameDataTeamVenue {
  id: number;
  name: string;
  link: string;
  city: string;
  timeZone: NHLFeedGameDataTeamVenueTimezone;
}

export interface NHLFeedGameDataTeamVenueTimezone {
  id: string;
  offset: number;
  tz: string;
}

export interface NHLFeedGameDataTeamDivision {
  id: number;
  name: string;
  link: string;
}

export interface NHLFeedGameDataTeamConference {
  id: number;
  name: string;
  link: string;
}

export interface NHLFeedGameDataTeamFranchise {
  franchiseId: number;
  teamName: string;
  link: string;
}

export interface NHLFeedGameDataPlayer {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  rosterStatus: string;
  currentTeam: NHLFeedGameDataPlayerCurrentTeam;
  primaryPostion: NHLFeedGameDataPlayerPrimaryPosition;
}

export interface NHLFeedGameDataPlayerCurrentTeam {
  id: number;
  name: string;
  link: string;
  triCode: string;
}

export interface NHLFeedGameDataPlayerPrimaryPosition {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
}

export interface NHLFeedGameDataVenue {
  id: number;
  name: string;
  link: string;
}

export interface NHLFeedLiveData {
  plays: NHLFeedLiveDataPlays;
  linescore: NHLFeedLiveDataLinescore;
  boxscore: NHLFeedLiveDataBoxscore;
  decisions: NHLFeedLiveDataDecisions;
}

export interface NHLFeedLiveDataPlays {
  allPlays: NHLFeedLiveDataPlay[];
  scoringPlays: number[];
  penaltyPlays: number[];
  playsByPeriod: NHLFeedLiveDataPlaysByPeriod[];
  currentPlay: NHLFeedLiveDataPlay;
}

export interface NHLFeedLiveDataPlay {
  result: NHLFeedLiveDataPlayResult;
  about: NHLFeedLiveDataPlayAbout;
  coordinates: NHLFeedLiveDataPlayCoordinates;
  team?: NHLFeedLiveDataPlayTeam;
  players?: NHLFeedLiveDataPlayPlayer[];
}

export interface NHLFeedLiveDataPlayResult {
  event: string;
  eventCode: string;
  eventTypeId: string;
  description: string;
  secondaryType ?: string;
}

export interface NHLFeedLiveDataPlayAbout {
  eventIdx: number;
  eventId: number;
  period: number;
  periodType: string;
  ordinalNum: string;
  periodTime: string;
  periodTimeRemaining: string;
  dateTime: string;
  goals: NHLFeedLiveDataPlayGoals;
}

export interface NHLFeedLiveDataPlayGoals {
  away: number;
  home: number;
}

export interface NHLFeedLiveDataPlayCoordinates {
  x?: number;
  y?: number;
}

export interface NHLFeedLiveDataPlayTeam {
  id: number;
  name: string;
  link: string;
  triCode: string;
}

export interface NHLFeedLiveDataPlayPlayer {
  playerType: string;
  player: {
    id: number;
    fullName: string;
    link: string;
  }
}

export interface NHLFeedLiveDataPlaysByPeriod {
  startIndex: number;
  plays: number[];
}

export interface NHLFeedLiveDataLinescore {
  currentPeriod: number;
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: string;
  periods: NHLFeedLiveDataLinescorePeriod[];
  shootoutInfo?: NHLFeedLiveDataLinescoreShootoutInfo;
  teams: {
    home: NHLFeedLiveDataLinescoreTeam;
    away: NHLFeedLiveDataLinescoreTeam;
  };
  powerPlayStrength: string;
  hasShootout: boolean;
  intermissionInfo: NHLFeedLiveDataLinescoreIntermissionInfo;
  powerPlayInfo: NHLFeedLiveDataLinescorePowerplayInfo;
}

export interface NHLFeedLiveDataLinescorePeriod {
  periodType: string;
  startTime: string;
  endTime: string;
  num: number;
  ordinalNum: string;
  home: NHLFeedLiveDataLinescorePeriodTeamStats;
  away: NHLFeedLiveDataLinescorePeriodTeamStats;
}

export interface NHLFeedLiveDataLinescorePeriodTeamStats {
  goals: number;
  shotsOnGoal: number;
  rinkSide: string;
}

export interface NHLFeedLiveDataLinescoreShootoutInfo {
  away: NHLFeedLiveDataLinescoreShootoutInfoTeam;
  home: NHLFeedLiveDataLinescoreShootoutInfoTeam;
  startTime: string;
}

export interface NHLFeedLiveDataLinescoreShootoutInfoTeam {
  scores: number;
  attempts: number;
}

export interface NHLFeedLiveDataLinescoreTeam {
  team: NHLFeedLiveDataLinescoreTeamInfo;
  goals: number;
  shotsOnGoal: number;
  goaliePulled: boolean;
  numSkaters: number;
  powerPlay: boolean;
}

export interface NHLFeedLiveDataLinescoreTeamInfo {
  id: number;
  name: string;
  link: string;
  abbreviation: string;
  triCode: string;
}

export interface NHLFeedLiveDataLinescoreIntermissionInfo {
  intermissionTimeRemaining: number;
  intermissionTimeElapsed: number;
  inIntermission: boolean;
}

export interface NHLFeedLiveDataLinescorePowerplayInfo {
  situationTimeRemaining: number;
  situationTimeElapsed: number;
  inSituation: boolean;
}

export interface NHLFeedLiveDataBoxscore {
  teams: {
    away: NHLFeedLiveDataBoxscoreTeam;
    home: NHLFeedLiveDataBoxscoreTeam;
  };
  officials: NHLFeedLiveDataBoxscoreOfficial[];
}

export interface NHLFeedLiveDataBoxscoreTeam {
  coaches: NHLFeedLiveDataBoxscoreTeamCoaches[];
  team: NHLFeedLiveDataBoxscoreTeamInfo;
  teamStats: NHLFeedLiveDataBoxscoreTeamStats;
  players: {
    [id: string]: NHLFeedLiveDataBoxscoreTeamPlayer
  }
}

export interface NHLFeedLiveDataBoxscoreTeamCoaches {
  person: {
    fullName: string;
    link: string;
  }
  position: PositionItem;
}

export interface NHLFeedLiveDataBoxscoreTeamInfo {
  id: number;
  name: string;
  link: string;
  abbreviation: string;
  triCode: string;
}

export interface NHLFeedLiveDataBoxscoreTeamStats {
  teamSkaterStats: NHLFeedLiveDataBoxscoreTeamSkaterStats;
}

export interface NHLFeedLiveDataBoxscoreTeamSkaterStats {
  goals: number;
  pim: number;
  shots: number;
  powerPlayPercentage: string;
  powerPlayGoals: number;
  powerPlayOpportunities: number;
  faceOffWinPercentage: string;
  blocked: number;
  takeaways: number;
  giveaways: number;
  hits: number;
}

export interface NHLFeedLiveDataBoxscoreTeamPlayer {
  person: NHLFeedLiveDataBoxscoreTeamPlayerInfo;
  jerseyNumber: string;
  position: PositionItem;
  stats: {
    skaterStats ?: NHLFeedLiveDataBoxscoreTeamSkaterStats;
    goalieStats ?: NHLFeedLiveDataBoxscoreTeamGoalieStats;
  };
}

export interface NHLFeedLiveDataBoxscoreTeamPlayerInfo {
  id: number;
  fullName: string;
  link: string;
  shootsCatches: string;
  rosterStatus: string;
}

export interface NHLFeedLiveDataBoxscoreTeamSkaterStats {
  timeOnIce: string;
  assists: number;
  goals: number;
  shots: number;
  hits: number;
  powerPlayGoals: number;
  powerPlayAssists: number;
  penaltyMinutes: number;
  faceoffWins: number;
  faceoffTaken: number;
  takeaways: number;
  giveaways: number;
  shortHandedGoals: number;
  shortHandedAssists: number;
  blocked: number;
  plusMinus: number;
  evenTimeOnIce: string;
  powerPlayTimeOnIce: string;
  shortHandedTimeOnIce: string;
}

export interface NHLFeedLiveDataBoxscoreTeamGoalieStats {
  timeOnIce: string;
  assists: number;
  goals: number;
  pim: number;
  shots: number;
  saves: number;
  powerPlaySaves: number;
  shortHandedSaves: number;
  evenSaves: number;
  shortHandedShotsAgainst: number;
  evenShotsAgainst: number;
  powerPlayShotsAgainst: number;
  decision: string;
  savePercentage: number;
  powerPlaySavePercentage: number;
  evenStrengthSavePercentage: number;
}

export interface NHLFeedLiveDataBoxscoreOfficial {
  official: NHLFeedLiveDataBoxscoreOfficialInfo;
  officialType: string;
}

export interface NHLFeedLiveDataBoxscoreOfficialInfo {
  id: number;
  fullName: string;
  link: string;
}

export interface NHLFeedLiveDataDecisions {
  winner: NHLFeedLiveDataDecision;
  loser: NHLFeedLiveDataDecision;
  firstStar: NHLFeedLiveDataDecision;
  secondStar: NHLFeedLiveDataDecision;
  thirdStar: NHLFeedLiveDataDecision;
}

export interface NHLFeedLiveDataDecision {
  id: number;
  fullName: string;
  link: string;
}