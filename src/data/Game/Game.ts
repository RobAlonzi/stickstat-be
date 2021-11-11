import api, { GAME_DATA_URL, AxiosResponse } from '../../api';
import NHLData from '../NHLData';
import { NHLFeedData } from './interface';

class GameData implements NHLData<NHLFeedData> {
  private url: string;

  constructor(private id: number) {
    this.url = GAME_DATA_URL(this.id);
  }

  async fetch(): Promise<NHLFeedData> {
    const response: AxiosResponse<NHLFeedData> = await api.get(this.url);
    return response.data;
  }
}

export default GameData;