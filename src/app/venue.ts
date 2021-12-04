import { NHLFeedGameDataTeamVenue } from '@/data/Game';
import DBVenue, { DBVenueItem } from '@/db/Venue';

interface Props extends NHLFeedGameDataTeamVenue {
  team_id: number;
}

async function saveVenues(home_venue: Props, away_venue: Props): Promise<DBVenueItem[]> {
  const db_home_venue = await saveVenue(home_venue);
  const db_away_venue = await saveVenue(away_venue);
  return [db_home_venue, db_away_venue];
}

async function saveVenue(venue: Props): Promise<DBVenueItem> {
 const db_venue = new DBVenue({
   id: venue.id,
   team_id: venue.team_id,
   name: venue.name,
   city: venue.city,
   timezone: venue.timeZone.id
 })

 return db_venue.upsert();
}


export default saveVenues;