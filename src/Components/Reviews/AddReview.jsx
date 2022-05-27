/* eslint-disable react/prop-types */
import React from 'react'
import { hot } from 'react-hot-loader/root';
import {
  AddWrapper,
  AddOverlay
}
from '../StyledComponents.jsx'
import ReactDom from 'react-dom'

const AddReview = ({children, open, onClose}) => {
  if (!open) {return null}
  return ReactDom.createPortal(
    <>
  <AddOverlay onClick={onClose}>
    <AddWrapper onClick={e => e.stopPropagation()}>
      <button onClick={onClose}>x</button>
      {children}
    </AddWrapper>
  </AddOverlay>
  </>,
  document.getElementById("portal")
  )
}

export default hot(AddReview)