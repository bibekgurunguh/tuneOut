import React from 'react';
import Styles from './ResponseItem.css'


export default function ResponseItem({ item, attribute }) {

  return (
    <div>
      <h3>{attribute }{item}</h3>
    </div>
  )
}
