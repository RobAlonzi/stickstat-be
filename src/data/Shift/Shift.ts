import api, { SHIFT_DATA_URL, AxiosResponse } from '../../api';
import NHLData from '../NHLData';
import { NHLFeedShiftData, NHLFeedShift } from './interface';

class ShiftData implements NHLData<NHLFeedShift[]> {
  private url: string;

  constructor(private id: number) {
    this.url = SHIFT_DATA_URL(this.id);
  }

  async fetch(): Promise<NHLFeedShift[]> {
    const response: AxiosResponse<NHLFeedShiftData> = await api.get(this.url);
    return response.data.data;
  }
}

export default ShiftData;