import * as React from 'react';
import './YtSearch.css';
const ytIcon2 = require('./ytIcon2.svg');

interface PropsType {
  externalIdYoutube: string | undefined,
  title: string,
  artist: string
}

export default function YtSearch({ externalIdYoutube, title, artist }: PropsType) {

  if (externalIdYoutube) {
    let vidLink = `https://www.youtube.com/watch?v=${externalIdYoutube}`
    return (
      <div>
        <a href={vidLink} target='_blank'><img className={'ytlogo'} src={ytIcon2} alt='Listen on Youtube'/></a>
      </div>
    )
  } else {
    let vidSearchY = `https://www.youtube.com/results?search_query=${title}+${artist}`
    return (
      <div>
        <a href={vidSearchY} target='_blank'><img className={'ytlogo'} src={ytIcon2} alt='Search on Youtube' /></a>
      </div>
    )
  }
}

