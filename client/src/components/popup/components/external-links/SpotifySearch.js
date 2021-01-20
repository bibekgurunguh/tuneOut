import React from 'react'
import Styles from './SpotifySearch.css'
import spotifyIcon from './spotifyIcon.svg'

export default function SpotifySearch({ externalIdSpotify, title, artist}) {


  if (externalIdSpotify) {
    let vidLink = `https://open.spotify.com/track/${externalIdSpotify}`
    return (
      <div>
        <a href={vidLink} target='_blank'><img className={Styles.spotifylogo} src={spotifyIcon} alt='Listen on Spotify'/></a>
      </div>
    )
  } else {
    let vidSearchS = `https://open.spotify.com/search/${artist}%20${title}`
    return (
      <div>
        <a href={vidSearchS} target='_blank'><img className={Styles.spotifylogo} src={spotifyIcon} alt='Search on Spotify'/></a>
      </div>
    )
  }
}
