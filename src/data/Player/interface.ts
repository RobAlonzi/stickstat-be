export interface NHLFeedPlayerData {
  copyright: string;
  people: NHLFeedPlayer[];
}

export interface NHLFeedPlayer {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string; // 1995-10-03
  currentAge: number;
  birthCity: string;
  birthStateProvince ?: string;
  birthCountry: string;
  nationality: string;
  height: string; // 6' 2"
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  rosterStatus: string;
  currentTeam: NHLFeedPlayerCurrentTeam;
  primaryPosition: NHLFeedPlayerPrimaryPosition;
}

export interface NHLFeedPlayerCurrentTeam {
  id: number;
  name: string;
  link: string;
}

export interface NHLFeedPlayerPrimaryPosition {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
}