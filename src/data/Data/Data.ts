import { NHLFeedData } from "../Game";
import { NHLFeedShift } from "../Shift";

class Data {
  constructor(private game: NHLFeedData, private shifts: NHLFeedShift[]) {}
}

export default Data;