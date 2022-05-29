/* eslint-disable react/prop-types */
import {useState, React } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  ReviewTile,
  ReviewBodyWrapper,
  ReviewImageWrapper,
  ReviewBody

}
from '../StyledComponents.jsx';
import Moment from 'react-moment';
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import {MAIN_API_KEY} from '../../config.js'

const ReviewListEntry = ({review, getReviews}) => {

  const [clickedYes, setClickedYes] = useState(false);

  const incrementHelpful = (id) => {
      axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`,
        method: 'put',
        headers: {
          Authorization: MAIN_API_KEY,
        },
      })
      .then (() => {
        setClickedYes(true)
        getReviews();
      })
  };

  return (
    <ReviewTile>
      <div>
        <div>
          {review.reviewer_name} Verified?*
        </div>
        <div>
          <StarRatings
            rating={review.rating}
            starRatedColor="gold"
            numberOfStars={5}
            starDimension={25}
            starSpacing={'2'}
          />
        </div>
        <Moment format='MMMM Do YYYY, h:mm:ss a'>{review.date}</Moment>
      </div>
      {review.response ? <div>{review.response}</div> : <div></div>}
      <p>{review.summary}</p>
      <ReviewBodyWrapper>
        <ReviewBody>{review.body}</ReviewBody>
        {review.recommend ? <p>✓ I recommend this product!</p> : null}
        <ReviewImageWrapper>
          User Images: Images Here 5 *Thumbnails*
        </ReviewImageWrapper>
        <u>Helpful?
          <u onClick={!clickedYes ? ()=>{incrementHelpful(review['review_id'])} : null}>
            Yes
          </u>
          {`(${review.helpfulness})`}
        </u>
      </ReviewBodyWrapper>
    </ReviewTile>
  )
}

export default hot(ReviewListEntry)