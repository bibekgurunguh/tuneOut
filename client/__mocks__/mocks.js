const mocks = {};

mocks.mockSongInfo = {
  status: {
    msg: 'Success',
    code: 0,
    version: '1.0',
  },
  metadata: {
    music: [
      {
        external_ids: {},
        contributors: { composers: ['André Boadu'] },
        label: 'Keinemusik',
        duration_ms: 477360,
        score: 100,
        play_offset_ms: 197640,
        release_date: '2015-07-10',
        genres: [{ name: 'Dance' }],
        external_metadata: {},
        title: 'Woods',
        acrid: '5c748ee8fc84dc80ef38cee6580cc890',
        album: { name: 'Trilogy' },
        result_from: 3,
        artists: [{ name: '&ME' }],
      },
    ],
    timestamp_utc: '2021-01-18 18:35:18',
  },

  cost_time: 0.24199986457825,
  result_type: 0,
};

mocks.clintEastwoodSongInfo = {
  status: { msg: 'Success', code: 0, version: '1.0' },
  metadata: {
    music: [
      {
        external_ids: {},
        external_metadata: {
          youtube: { vid: 'UclCCFNG9q4' },
          spotify: {
            album: {
              name: 'Lazy Sunday: The Best Of Now, Then And Inbetween',
              id: '53CcU3ezMBTKA0OaU76yCC',
            },
            artists: [{ name: 'Gorillaz', id: '3AA28KZvwAUcZuOKwyblJQ' }],
            track: {
              name: 'Clint Eastwood - Original Mix Clean Edit',
              id: '0TdP50dxBM62cWvnocDv5r',
            },
          },
        },
        title: 'Clint Eastwood',
        album: { name: 'Gorillaz' },
        artists: [{ name: 'Gorillaz' }],
        contributors: {
          lyricists: ['Damon Albarn', 'Teren Devlon Jones', 'Jamie Hewlett'],
          composers: [
            'Gorillaz',
            'Murdoc Niccals',
            '2D',
            'Del the Funky Homosapien',
          ],
        },
        label: 'Parlophone UK',
        duration_ms: 340920,
        score: 100,
        play_offset_ms: 68520,
        release_date: '2001-03-26',
        lyrics: { copyrights: ['Universal Music Publishing Group'] },
        genres: [{ name: 'Hip Hop' }],
        result_from: 3,
        acrid: '93af82a4486b730c0ff8cd99b135d950',
      },
      {
        external_ids: {},
        contributors: {
          lyricists: ['Damon Albarn', 'Teren Devlon Jones', 'Jamie Hewlett'],
          composers: [
            'Gorillaz',
            'Murdoc Niccals',
            '2D',
            'Del the Funky Homosapien',
          ],
        },
        label: 'Rhino',
        duration_ms: 332180,
        score: 100,
        play_offset_ms: 65640,
        external_metadata: {},
        lyrics: { copyrights: ['Universal Music Publishing Group'] },
        release_date: '2015-02-15',
        title: 'Clint Eastwood',
        album: { name: 'Best Of 2001-2012' },
        acrid: 'fa60c9ce7e26823566ce3fc24f356e45',
        result_from: 3,
        artists: [{ name: 'Gorillaz' }],
      },
    ],
    timestamp_utc: '2021-01-25 12:25:27',
  },
  cost_time: 0.24600005149841,
  result_type: 0,
};

module.exports = mocks;
