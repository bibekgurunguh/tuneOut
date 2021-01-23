import * as React from 'react';
import ResponseItem from './ResponseItem'
import './ResponseBox.css'
import Lottie from 'react-lottie';
// import animationData from '../animations/loading-animation.json'
const animationData = require("../animations/loading-animation.json");
import YtSearch from './external-links/YtSearch'
import SpotifySearch from './external-links/SpotifySearch'
import DiscogsSearch from './external-links/DiscogsSearch'

export function ResponseBox({ songInfo, setSongInfo, animation }) {


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  if (animation === true) {
    return (
      <div className={'animation'}>
        <Lottie
          options={defaultOptions}
          height={260}
          width={275}
          />
    </div>
    )
  }

  if (songInfo) {

    const songObj = JSON.parse(songInfo)
    if (songObj.status.code === 1001) {
      //? on song identification failure
      songInfo = [];
      return (
        <div className={'errorBox'}>
          <h3 className={'errorMessage'}>couldn't identify track</h3>
          <h3 className={'errorMessage'}>please try again</h3>
        </div>
      )
    } else if (songObj.status.code === 2004) {
      //? on song fingerprint failure
      songInfo = [];
      return (
        <div className={'errorBox'}>
          <h3 className={'errorMessage'}>couldn't detect audio</h3>
          <h3 className={'errorMessage'}>please try again</h3>
        </div>
      )
    }

    console.log('parser', songObj)
    console.log('typeofparsed', typeof songObj)
    console.log('songinfo.metadata', songObj.metadata)


    const id = songObj.metadata.music[0]

    const title = id.title
    const artist = id.artists[0].name
    const label = id.label
    const released = id.release_date
    const album = id.album.name

    const trackId = 'Track ID: '
    const trackArtist = 'Artist: '
    const trackReleased = 'Released: '
    const trackAlbum = 'Album: '
    const trackLabel = 'Label: '

    let externalIdSpotify;
    let externalIdYoutube;

    if (id.external_metadata.spotify) {
        externalIdSpotify = id.external_metadata.spotify.track.id
    }

    if (id.external_metadata.youtube) {
        externalIdYoutube = id.external_metadata.youtube.vid
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
          <div className='yt'>
            <YtSearch externalIdYoutube={externalIdYoutube} title={title} artist={artist}></YtSearch>
          </div>
          <div className='spotify'>
            <SpotifySearch externalIdSpotify={externalIdSpotify} title={title} artist={artist} ></SpotifySearch>
          </div>
          <DiscogsSearch artist={artist} album={album}></DiscogsSearch>
        </div>
      </div>
    )
  }


  //? On popup initialization
  const firstMsg = 'navigate to an audible tab'
  const secondMsg = 'click identify to start'

  return (
    <div className={'emptyResBox'}>
      <ResponseItem attribute={firstMsg} item={''}></ResponseItem>
      <ResponseItem attribute={secondMsg} item={''}></ResponseItem>
    </div>
  )
}
