import api, { OFFICIAL_DATA_URL, AxiosResponse } from '../../api';
import NHLData from '../NHLData';
import { NHLFeedOfficialData, NHLFeedOfficial } from './interface';

class OfficialData implements NHLData<NHLFeedOfficial> {
  private url: string;

  constructor(private id: number) {
    this.url = OFFICIAL_DATA_URL(this.id);
  }

  async fetch(): Promise<NHLFeedOfficial> {
    const response: AxiosResponse<NHLFeedOfficialData> = await api.get(this.url);
    return response.data.data[0];
  }
}

export default OfficialData;