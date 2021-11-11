export interface NHLFeedOfficialData {
  data: NHLFeedOfficial[];
  total: number;
}

export interface NHLFeedOfficial {
  id: number;
  active: boolean;
  associationUrl: string;
  birthCity: string;
  birthDate: string; // 1968-11-03T00:00:00
  countryCode: string;
  firstName: string;
  firstPlayoffGameId: number;
  firstRegularGameId: number;
  headshot_url: string;
  lastName: string;
  officialType: string;
  officialsSchemaId: number;
  referreeAssociationId: number;
  stateProvinceCode: string;
  sweaterNumber: number;
  thumb_url: string;
}