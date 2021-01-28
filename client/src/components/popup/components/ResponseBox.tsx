import * as React from 'react';
import ResponseItem from './ResponseItem';
import './ResponseBox.css';
import Lottie from 'react-lottie';
const animationData = require('../animations/loading-animation.json');
import YtSearch from './external-links/YtSearch';
import SpotifySearch from './external-links/SpotifySearch';
import DiscogsSearch from './external-links/DiscogsSearch';
import GoogleSearch from './external-links/GoogleSearch';

import { SongInfoObject } from '../../types/interfaces';

interface PropsType {
  stringifiedSongInfo: string,
  animation: boolean
}

export function ResponseBox({ stringifiedSongInfo, animation }: PropsType) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (animation === true) {
    return (
      <div className={'animation'}>
        <Lottie options={defaultOptions} height={260} width={275} />
      </div>
    );
  }

  if (stringifiedSongInfo) {
    const songObj: SongInfoObject = JSON.parse(stringifiedSongInfo);
    if (songObj.status.code === 1001) {
      //? on song identification failure
      stringifiedSongInfo = '';
      return (
        <div className={'errorBox'}>
          <h3 className={'errorMessage'}>couldn't identify track</h3>
          <h3 className={'errorMessage'}>please try again</h3>
        </div>
      );
    } else if (songObj.status.code === 2004) {
      //? on song fingerprint failure
      stringifiedSongInfo = '';
      return (
        <div className={'errorBox'}>
          <h3 className={'errorMessage'}>couldn't detect audio</h3>
          <h3 className={'errorMessage'}>please try again</h3>
        </div>
      );
    }

    const id = songObj.metadata.music[0];

    const title = id.title;
    const artist = id.artists[0].name;
    const label = id.label;
    const released = id.release_date;
    const album = id.album.name;

    const trackId = 'Track ID: ';
    const trackArtist = 'Artist: ';
    const trackReleased = 'Released: ';
    const trackAlbum = 'Album: ';
    const trackLabel = 'Label: ';

    let externalIdSpotify: string | undefined;
    let externalIdYoutube: string | undefined;

    if (id.external_metadata.spotify) {
      externalIdSpotify = id.external_metadata.spotify.track.id;
    }

    if (id.external_metadata.youtube) {
      externalIdYoutube = id.external_metadata.youtube.vid;
    }

    //? on song identification successful
    return (
      <div className={'resBox'}>
        <ResponseItem attribute={trackId} item={title}></ResponseItem>
        <ResponseItem attribute={trackArtist} item={artist}></ResponseItem>
        <ResponseItem attribute={trackReleased} item={released}></ResponseItem>
        <ResponseItem attribute={trackAlbum} item={album}></ResponseItem>
        <ResponseItem attribute={trackLabel} item={label}></ResponseItem>
        <div className={'linkbox'}>
          <div className="yt">
            <YtSearch
              externalIdYoutube={externalIdYoutube}
              title={title}
              artist={artist}
            ></YtSearch>
          </div>
          <div className="spotify">
            <SpotifySearch
              externalIdSpotify={externalIdSpotify}
              title={title}
              artist={artist}
            ></SpotifySearch>
          </div>
          <DiscogsSearch artist={artist} album={album}></DiscogsSearch>
          <GoogleSearch artist={artist} title={title}></GoogleSearch>
        </div>
      </div>
    );
  }

  //? On popup initialization
  const firstMsg = 'Navigate to an audible tab';
  const secondMsg = 'Click identify to start';

  return (
    <div className={'emptyResBox'}>
      <ResponseItem attribute={firstMsg} item={''}></ResponseItem>
      <ResponseItem attribute={secondMsg} item={''}></ResponseItem>
    </div>
  );
}
