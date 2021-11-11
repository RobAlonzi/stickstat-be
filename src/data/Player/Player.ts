import api, { PLAYER_DATA_URL, AxiosResponse } from '../../api';
import NHLData from '../NHLData';
import { NHLFeedPlayerData, NHLFeedPlayer } from './interface';

class PlayerData implements NHLData<NHLFeedPlayer> {
  private url: string;

  constructor(private id: number) {
    this.url = PLAYER_DATA_URL(this.id);
  }

  async fetch(): Promise<NHLFeedPlayer> {
    const response: AxiosResponse<NHLFeedPlayerData> = await api.get(this.url);
    return response.data.people[0];
  }
}

export default PlayerData;