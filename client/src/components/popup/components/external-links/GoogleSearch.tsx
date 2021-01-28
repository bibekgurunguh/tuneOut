import * as React from 'react';
import './GoogleSearch.css';
const googleIcon = require('./google-icon.svg');

interface PropsType {
  title: string,
  artist: string
}

export default function YtSearch({ title, artist }: PropsType) {

  let searchLink = `https://www.google.com/search?q=${title}+${artist}+Lyrics`
  return (
    <div>
      <a href={searchLink} target='_blank'>
        <img className={'GoogleLogo'} src={googleIcon} alt='Search Lyrics on Google' />
      </a>
    </div>
  )
  
}

