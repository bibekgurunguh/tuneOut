import * as React from 'react';
import './ResponseItem.css'



export default function ResponseItem({ item, attribute }) {

  return (
    <div>
      <h3 className={'responseItem'}><strong className={'attribute'}>{attribute}</strong>{item}</h3>
    </div>
  )
}
