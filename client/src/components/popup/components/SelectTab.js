import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { useTransition, animated } from 'react-spring';
import Styles from './SelectTab.css'

export default function SelectTab() {



  return (
    <div className={Styles.dropdownContainer}>
    </div>
  )
}

//TODO - implement drop down menu to list all *currently* audible tabs. use listAllTabs() - located in popup.js