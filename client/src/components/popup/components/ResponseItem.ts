import React from 'react';
import Styles from './ResponseItem.css'



export default function ResponseItem({ item, attribute }) {

  return (
    <div>
      <h3 className={Styles.responseItem}><strong className={Styles.attribute}>{attribute}</strong>{item}</h3>
    </div>
  )
}
