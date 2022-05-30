/* eslint-disable react/prop-types */
import {useEffect, React, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  ReviewTile,
  ReviewBodyWrapper,
  ReviewImageWrapper,
  ReviewBody,
  UpdateButtons,
  StyledQuestion
}
from '../StyledComponents.jsx';
import Moment from 'react-moment';
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import {MAIN_API_KEY} from '../../config.js'

const ReviewListEntry = ({review, getReviews}) => {
  const [clickedYes, setClickedYes] = useState(false);

  //not working
  const incrementHelpful = (id) => {
      axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`,
        method: 'put',
        headers: {
          Authorization: MAIN_API_KEY,
        },
      })
      .then (() => {
        getReviews();
      })
      .then(()=>{
        setClickedYes(true)
      })
  };

  return (
    <ReviewTile>
      <div>
        <StyledQuestion>
          <h3>
            {review.reviewer_name} Verified?*
          </h3>
          <div>
            <small> Helpful? <UpdateButtons disabled={clickedYes} onClick={()=>{incrementHelpful(review['review_id'])}}> Yes ({review.helpfulness}) </UpdateButtons>
            </small>
          </div>
        </StyledQuestion>
        <div>
          <StarRatings
            rating={review.rating}
            starRatedColor="gold"
            numberOfStars={5}
            starDimension={25}
            starSpacing={'2'}
          />
        </div>
        <Moment format='MMMM Do YYYY'>{review.date}</Moment>
      </div>
      {review.response ? <div>{review.response}</div> : <div></div>}
      <p>{review.summary}</p>
      <ReviewBodyWrapper>
        <ReviewBody>{review.body}</ReviewBody>
        {review.recommend ? <p>✓ I recommend this product!</p> : null}
        <ReviewImageWrapper>
          User Images: Images Here 5 *Thumbnails*
        </ReviewImageWrapper>
      </ReviewBodyWrapper>
    </ReviewTile>
  )
}

export default hot(ReviewListEntry)