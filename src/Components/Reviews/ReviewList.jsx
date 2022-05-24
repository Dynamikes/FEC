/* eslint-disable react/prop-types */
import React from 'react'
import { hot } from 'react-hot-loader/root';
import {
  ReviewListWrapper,
  ReviewButtonWrapper,
}
from '../StyledComponents.jsx'
import ReviewListEntry from './ReviewListEntry'

const ReviewList = ({reviews}) => {

  return (
    <ReviewListWrapper>
      {console.log(reviews[0])}
     --------------------------------Review List-------------------------------
      <div>
        {reviews.length} Reviews /*sortedBy*
      </div>
      {reviews.slice(0,2).map((review, index) => <ReviewListEntry key={index} review={review}/>)}
      <ReviewButtonWrapper>
        <button>More Reviews</button>
        <button>Add a Review</button>
      </ReviewButtonWrapper>
    </ReviewListWrapper>
  )
}

export default hot(ReviewList)