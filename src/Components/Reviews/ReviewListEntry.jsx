/* eslint-disable react/prop-types */
import {React} from 'react'
import { hot } from 'react-hot-loader/root';
import {
  ReviewTile,
  ReviewBody,
  ReviewImageWrapper,

}
from '../StyledComponents.jsx'

const ReviewListEntry = ({review}) => {

  return (
    <ReviewTile>
        <div>
          Ver / username/ date
        </div>
        <div>response from seller</div>
        <div>star rating</div>
        <p>{review.summary}</p>
        <ReviewBody>
         -ReviewBody-
          <p>{review.body}</p>
          <p>check mark + Recommend this product?</p>
          <ReviewImageWrapper>
            User Images: Images Here 5
          </ReviewImageWrapper>
          <u>Helpful? Yes {`(${review.helpfulness})`}</u>
        </ReviewBody>
      </ReviewTile>
  )
}

export default hot(ReviewListEntry)