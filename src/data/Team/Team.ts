import api, { TEAM_DATA_URL, AxiosResponse } from '../../api';
import NHLData from '../NHLData';
import { NHLFeedTeam, NHLFeedTeamResponse } from './interface';

class TeamData implements NHLData<NHLFeedTeam> {
  private url: string;

  constructor(private id: number) {
    this.url = TEAM_DATA_URL(this.id);
  }

  async fetch(): Promise<NHLFeedTeam> {
    const response: AxiosResponse<NHLFeedTeamResponse> = await api.get(this.url);
    return response.data.teams[0];
  }
}

export default TeamData;