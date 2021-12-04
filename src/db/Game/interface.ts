export interface DBGameItem {
  id: number;
  season: string;
  type: string;
  status: string;
  home_id: number;
  away_id: number;
  start_time: string;
  end_time: string;
  venue_id: number;
  home_score: number;
  away_score: number;
  is_shootout: boolean;
}