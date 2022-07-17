export interface DBGameGoalieItem {
  game_id: number;
  player_id: number;
  team_id: number;
  opponent_id: number;
  home_away: string;
  position: string;
  jersey_number: number;
  toi?: number;
  goals?: number;
  assists?: number;
  pim?: number;
  shots?: number;
  saves?: number;
  pp_saves?: number;
  ev_saves?: number;
  sh_saves?: number;
  pp_shots_against?: number;
  sh_shots_against?: number;
  ev_shots_against?: number;
  decision?: string;
  is_scratch: boolean;
  is_starter: boolean;
}