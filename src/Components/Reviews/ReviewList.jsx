import React from 'react'
import { hot } from 'react-hot-loader/root';
import {
  ReviewListWrapper,
  ReviewTile,
  ReviewBody,
  ReviewImageWrapper,
  ReviewButtonWrapper,
}
from '../StyledComponents.jsx'
import ReviewListEntry from './ReviewListEntry'

const ReviewList = () => {

  return (
    <ReviewListWrapper>
      --Review List--
      <div>
        # Reviews/sortedBy
      </div>
      <ReviewTile>
        <div>
          Ver / username/ date
        </div>
        <div>response from seller</div>
        <div>star rating</div>
        <p>Review Summary</p>
        <ReviewBody>
          --ReviewBody--
          <p>Review Body 250 chars showing</p>
          <p>check mark + Recommend this product?</p>
          <ReviewImageWrapper>
            Images Here 5
            <button>Submit Image</button>
          </ReviewImageWrapper>
          <u>Helpful? Yes {'(ADD helpfulness here)'}</u>
        </ReviewBody>
      </ReviewTile>
      <ReviewButtonWrapper><button>More Reviews</button> <button>Add a Review</button></ReviewButtonWrapper>
    </ReviewListWrapper>
  )
}

export default hot(ReviewList)