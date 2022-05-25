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
        <div>
          {review.reviewer_name} Verified?*
        </div>
        <div>
          star rating
        </div>
         {review.date} --**HUMAN READABLE**--
        </div>
        {review.response ? <div>{review.response}</div> : <div></div>}
        <p>{review.summary}</p>
        <ReviewBody>
         -ReviewBody-
          <p>{review.body}</p>
          {review.recommend ? <p>✅ I Recommend This Product!</p> : <p></p>}
          <ReviewImageWrapper>
            User Images: Images Here 5 *Thumbnails*
          </ReviewImageWrapper>
          <u>Helpful? Yes {`(${review.helpfulness})`}</u>
        </ReviewBody>
      </ReviewTile>
  )
}

export default hot(ReviewListEntry)