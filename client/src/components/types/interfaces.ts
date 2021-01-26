

export interface SongInfoObject {
  status: {
    msg: string,
    code: number,
    version: string,
  },
  metadata: {
    music: [
      {
        external_ids: {},
        contributors: { composers: string[] },
        label: string,
        duration_ms: number,
        score: number,
        play_offset_ms: number,
        release_date: string,
        genres: [{ name: string }],
        external_metadata: {
          youtube?: { vid: string},
          spotify?: {
            album: {name: string, id: string},
            artists: [{name: string, id: string}],
            track: {name: string, id: string}
          },
        },
        title: string,
        acrid: string,
        album: { name: string },
        result_from: number,
        artists: [{ name: string }],
      },
    ],
    timestamp_utc: string,
  },
  cost_time: number,
  result_type: number,
}