/* eslint-disable react/prop-types */
import {useEffect, React } from 'react';
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
import config from '../../config.js'

const ReviewListEntry = ({review, getReviews}) => {

  //not working
  const incrementHelpful = (id) => {
      axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`,
        method: 'put',
        headers: {
          Authorization: config.API_KEY,
        },
      })
      .then (() => {
        getReviews();
      })
  };

  return (
    <ReviewTile>
      {console.log(review)}
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
          <u onClick={()=>{incrementHelpful(review['review_id'])}}>
            Yes
          </u>
          {`(${review.helpfulness})`}
        </u>
      </ReviewBodyWrapper>
    </ReviewTile>
  )
}

export default hot(ReviewListEntry)