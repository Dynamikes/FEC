/* eslint-disable react/prop-types */
import {React} from 'react'
import { hot } from 'react-hot-loader/root';
import {
  ReviewTile,
  ReviewBodyWrapper,
  ReviewImageWrapper,
  ReviewBody

}
from '../StyledComponents.jsx';
import Moment from 'react-moment';

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
         <Moment format='MMMM Do YYYY, h:mm:ss a'>{review.date}</Moment>
        </div>
        {review.response ? <div>{review.response}</div> : <div></div>}
        <p>{review.summary}</p>
        <ReviewBodyWrapper>
          <ReviewBody>{review.body}</ReviewBody>
          {review.recommend ? <p>✓ I recommend this product!</p> : <p></p>}
          <ReviewImageWrapper>
            User Images: Images Here 5 *Thumbnails*
          </ReviewImageWrapper>
          <u>Helpful? Yes {`(${review.helpfulness})`}</u>
        </ReviewBodyWrapper>
      </ReviewTile>
  )
}

export default hot(ReviewListEntry)