import * as React from 'react';
const discogsIcon =  require('./discogsIcon.svg');

interface PropsType {
  artist: string
  album: string,
}

export default function DiscogsSearch({ artist, album }: PropsType) {

  const searchURL = `https://www.discogs.com/search/?q=${artist}+${album}&type=all`

  return (
    <div>
       <a href={searchURL} target='_blank'><img src={discogsIcon} alt='Search on Discogs'/></a>
    </div>
  )
}
