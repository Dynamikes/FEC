/* eslint-disable react/prop-types */
import { useState, React } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  ReviewListWrapper,
  ReviewButtonWrapper,
}
from '../StyledComponents.jsx'
import ReviewListEntry from './ReviewListEntry'

const ReviewList = ({reviews}) => {
  const [reviewCount, setReviewCount] = useState(2);

  return (
    <ReviewListWrapper>
      {console.log(reviews[0])}
     --Review List--
      <div>
        {reviews.length} Reviews /*sortedBy*
      </div>
      {reviews.slice(0,reviewCount).map((review, index) => <ReviewListEntry key={index} review={review} reviews={reviews}/>)}
      <ReviewButtonWrapper>
        {reviewCount < reviews.length ? <button onClick={() => { setReviewCount(reviewCount + 2)}}>More Reviews</button> : <div></div>}
        <button>Add a Review</button>
      </ReviewButtonWrapper>
    </ReviewListWrapper>
  )
}

export default hot(ReviewList)