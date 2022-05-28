/* eslint-disable react/prop-types */
import React from 'react'
import { hot } from 'react-hot-loader/root';
import {
  AddWrapper,
  AddOverlay
}
from '../StyledComponents.jsx'

const AddReview = ({children, open, onClose}) => {
  if (!open) {return null}
  else {return (
    <>
      <AddOverlay onClick={onClose}>
        <AddWrapper onClick={e => e.stopPropagation()}>
          <button onClick={onClose}>x</button>
          {children}
        </AddWrapper>
      </AddOverlay>
    </>
  )}
}

export default hot(AddReview)