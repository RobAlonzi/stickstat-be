import { PositionItem } from '@/data/interface';
import { NHLFeedLiveDataBoxscoreTeamPlayerInfo, NHLFeedLiveDataBoxscoreTeamSkaterStats, NHLFeedLiveDataBoxscoreTeamGoalieStats } from '@/data/Game';

export interface DataPlayersType {
  home: DataPlayerType[];
  away: DataPlayerType[];
}

export interface DataGoalieStatsType extends NHLFeedLiveDataBoxscoreTeamGoalieStats {
  is_starter: boolean;
}

export interface DataPlayerType {
  id: number;
  vitals: NHLFeedLiveDataBoxscoreTeamPlayerInfo;
  stats?: NHLFeedLiveDataBoxscoreTeamSkaterStats | NHLFeedLiveDataBoxscoreTeamGoalieStats;
  position: PositionItem;
  number: number;
}