import React from 'react'
import ResponseItem from './ResponseItem.js'
import Styles from './ResponseBox.css'

export default function ResponseBox({ songInfo }) {

  if (songInfo) {
    const songObj = JSON.parse(songInfo)

    if (songObj.status.code === 1001) {
      return (
        <div>
          <h1>Couldn't identify track</h1>
        </div>
      )
    }

    console.log('parser', songObj)
    console.log('typeofparsed', typeof songObj)
    console.log('songinfo.metadata', songObj.metadata)


    const id = songObj.metadata.music[0]
    console.log('id.title', id.title)
    console.log('id.artists.name', id.artists.name)
    console.log('id.label', id.label)
    console.log('id.release_date', id.release_date)
    console.log('id.album.name', id.album.name)

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

    return (
      <div className={Styles.resBox}>
        <ResponseItem attribute={trackId} item={title}></ResponseItem>
        <ResponseItem attribute={trackArtist} item={artist}></ResponseItem>
        <ResponseItem attribute={trackReleased} item={released}></ResponseItem>
        <ResponseItem attribute={trackAlbum} item={album}></ResponseItem>
        <ResponseItem attribute={trackLabel} item={label}></ResponseItem>
      </div>
    )
  } return (
    <div className={Styles.emptyResBox}>
      <h1>ready to go</h1>
    </div>
  )
}
