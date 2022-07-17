import Official from '@/data/Official';
import { NHLFeedLiveDataBoxscoreOfficial } from '@/data/Game';
import DBOfficial, { DBOfficialItem } from '@/db/Official';

async function saveOfficials(officials: NHLFeedLiveDataBoxscoreOfficial[]): Promise<DBOfficialItem[]> {
  const db_officials: DBOfficialItem[] = [];

  for(const official of officials) {
    const db_official = await fetchAndSaveOffical(official.official.id);
    db_officials.push(db_official);
  }

  return db_officials;
}

async function fetchAndSaveOffical(id: number): Promise<DBOfficialItem> {
  const official = new Official(id);
  const official_data = await official.fetch();

  const db_official = new DBOfficial({
    id,
    first_name: official_data.firstName,
    last_name: official_data.lastName,
    birthdate: official_data.birthDate,
    birth_city: official_data.birthCity,
    country: official_data.countryCode,
    state_prov: official_data.stateProvinceCode,
    type: official_data.officialType,
    number: official_data.sweaterNumber,
    season_debut_id: official_data.firstRegularGameId,
    playoff_debut_id: official_data.firstPlayoffGameId,
    headshot: official_data.headshot_url,
    active: official_data.active
  })

 return db_official.upsert();
}


export default saveOfficials;