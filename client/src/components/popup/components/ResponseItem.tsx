import * as React from 'react';
import './ResponseItem.css'

interface PropsType {
  item: string,
  attribute: string,
}

export default function ResponseItem({ item, attribute }: PropsType) {

  return (
    <div>
      <h3 className={'responseItem'}><strong className={'attribute'}>{attribute}</strong>{item}</h3>
    </div>
  )
}
