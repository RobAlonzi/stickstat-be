export const GAME_DATA_URL: (id: number) => string = (id: number) => `https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`;
export const SHIFT_DATA_URL: (id: number) => string = (id: number) => `https://api.nhle.com/stats/rest/en/shiftcharts?cayenneExp=gameId=${id}`;
export const PLAYER_DATA_URL: (id: number) => string = (id: number) => `https://statsapi.web.nhl.com/api/v1/people/${id}`;
export const OFFICIAL_DATA_URL: (id: number) => string = (id: number) => `https://records.nhl.com/site/api/officials?cayenneExp=id=${id}`;
export const TEAM_DATA_URL: (id: number) => string = (id: number) => `https://statsapi.web.nhl.com/api/v1/teams/${id}`;