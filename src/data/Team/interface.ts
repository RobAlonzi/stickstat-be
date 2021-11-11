export interface NHLFeedTeamResponse {
  teams: NHLFeedTeam[];
}

export interface NHLFeedTeam {
  id: number;
  name: string;
  link: string;
  venue: NHLFeedTeamVenue;
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: NHLFeedTeamDivision;
  conference: NHLFeedTeamConference;
  franchise: NHLFeedTeamFranchise;
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
}

export interface NHLFeedTeamVenue {
  id: number;
  name: string;
  link: string;
  city: string;
  timeZone: NHLFeedTeamVenueTimezone;
}

export interface NHLFeedTeamVenueTimezone {
  id: string;
  offset: number;
  tz: string;
}

export interface NHLFeedTeamDivision {
  id: number;
  nameShort: string;
  name: string;
  link: string;
  abbreviation: string;
}

export interface NHLFeedTeamConference {
  id: number;
  name: string;
  link: string;
}

export interface NHLFeedTeamFranchise {
  franchiseId: number;
  teamName: string;
  link: string;
}