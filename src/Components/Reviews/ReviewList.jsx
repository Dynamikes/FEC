/* eslint-disable react/prop-types */
import { useState, React } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  ReviewListWrapper,
  ReviewButtonWrapper,
}
from '../StyledComponents.jsx'
import ReviewListEntry from './ReviewListEntry'
import AddReview from './Addreview.jsx'

const ReviewList = ({reviews}) => {
  const [reviewCount, setReviewCount] = useState(2);

  const [openAdd, setAdd ] = useState(false)

  return (
    <ReviewListWrapper>
      {openAdd && <AddReview/>}
      <div>
        {reviews.length} Reviews /*sortedBy*
      </div>
      {reviews.slice(0,reviewCount).map((review, index) => <ReviewListEntry key={index} review={review} reviews={reviews}/>)}
      <ReviewButtonWrapper>
        {reviewCount < reviews.length && reviews.length > 2 ? <button onClick={() => { setReviewCount(reviewCount + 2)}}>More Reviews</button> : null}
        <button onClick={()=>{setAdd(true)}}>Add a Review</button>
      </ReviewButtonWrapper>
    </ReviewListWrapper>
  )
}

export default hot(ReviewList)