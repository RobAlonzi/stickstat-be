export interface DBPlayerItem {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team_id: number | null;
  number: number;
  birth_date: string;
  birth_city: string;
  birth_state: string | null;
  birth_country: string;
  nationality: string;
  height: number;
  weight: number;
  handedness: string;
  active: boolean;
  rookie: boolean;
}