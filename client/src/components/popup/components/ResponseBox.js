import React from 'react'
import ResponseItem from './ResponseItem.js'

export default function ResponseBox({ songInfo }) {

  if (songInfo) {
    console.log('id', songInfo)
    const songObj = JSON.parse(songInfo)
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

    return (
      <div>
        <ResponseItem item={title}></ResponseItem>
        <ResponseItem item={artist}></ResponseItem>
        <ResponseItem item={released}></ResponseItem>
        <ResponseItem item={album}></ResponseItem>
        <ResponseItem item={label}></ResponseItem>
      </div>
    )
  } return (
    <div>
      <h1>ready to go</h1>
    </div>
  )
}
