import React from 'react'
import { hot } from 'react-hot-loader/root';
import {
  AddWrapper,
  AddTitle
}
from '../StyledComponents.jsx'

const AddReview = () => {

  return (
   <AddWrapper>
     <AddTitle>Write Your Review</AddTitle>
     <h3>About the *Add Product Name*</h3>
     <div>Overall rating -Stars-*</div>
     <div>Radio Button- helpful review yes no</div>
     
  </AddWrapper>
  )
}

export default hot(AddReview)