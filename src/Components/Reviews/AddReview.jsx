/* eslint-disable react/prop-types */
import React from 'react'
import { hot } from 'react-hot-loader/root';
import {
  AddReviewWrapper,
  AddOverlay
}
from '../StyledComponents.jsx'

const AddReview = ({children, open, onClose}) => {
  if (!open) {return null}
  else {return (
    <>
      <AddOverlay onClick={onClose}>
        <AddReviewWrapper onClick={e => e.stopPropagation()}>
          <button onClick={onClose}>x</button>
          {children}
        </AddReviewWrapper>
      </AddOverlay>
    </>
  )}
}

export default hot(AddReview)