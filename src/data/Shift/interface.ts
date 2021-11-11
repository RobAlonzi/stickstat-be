export interface NHLFeedShiftData {
  data: NHLFeedShift[];
}

export interface NHLFeedShift {
  id: number;
  detailCode: number;
  duration: string | null; // 00:32 (when null means there was event desc or event details)
  endTime: string; // 00:32
  eventDescription: string | null; // EVG or Shootout
  eventDetails: string | null; // "Clark Bishop, Christian Wolanin" (assists)
  eventNumber: number;
  firstName: string;
  gameId: number;
  hexValue: string;
  lastName: string;
  period: number;
  playerId: number;
  shiftNumber: number;
  startTime: string; // 00:32
  teamAbbrev: string;
  teamId: number;
  teamName: string;
  typeCode: number;
}