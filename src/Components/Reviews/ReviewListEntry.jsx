/* eslint-disable react/prop-types */
import {useEffect, React, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  ReviewTile,
  ReviewBodyWrapper,
  ReviewBody,
  UpdateButtons,
  StyledQuestion,
  AnswerPhotos,
  AnswerPhoto,
  ImagePopUp,
  AddOverlay,
  AddWrapper,
  CheckSpan
}
from '../StyledComponents.jsx';
import Moment from 'react-moment';
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import {MAIN_API_KEY} from '../../config.js'

const ReviewListEntry = ({review, getReviews}) => {
  const [clickedYes, setClickedYes] = useState(false);
  const [popUpPicture, setPopUpPicture] = useState('');
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
          <div>
          <StarRatings
            rating={review.rating}
            starRatedColor="gold"
            numberOfStars={5}
            starDimension={'15px'}
            starSpacing={'2'}
          />
        </div>
          <div>
            <small> Helpful? <UpdateButtons disabled={clickedYes} onClick={()=>{incrementHelpful(review['review_id'])}}> Yes ({review.helpfulness}) </UpdateButtons>
            </small>
          </div>
        </StyledQuestion>
          <div><big>{review.reviewer_name} <CheckSpan> ✓ </CheckSpan> </big></div>
        <small> on <Moment format='MMMM Do YYYY'>{review.date}</Moment></small>
      </div>
      {review.response ? <div>{review.response}</div> : <div></div>}
      <p><b>{review.summary}</b></p>
      <ReviewBodyWrapper>
        <ReviewBody>{review.body}</ReviewBody>
        {review.recommend ? <p><CheckSpan>✓</CheckSpan> I recommend this product!</p> : null}
        <AnswerPhotos>
        {review['photos'].length === 0 ? null :
          review['photos'].map((photo, index) => (
            <AnswerPhoto key={index} src={photo.url} onClick={()=>{setPopUpPicture(photo.url)}}/>
          ))
        }
      </AnswerPhotos>
      {popUpPicture === '' ? null :
        <AddOverlay onClick={() => setPopUpPicture('')}>
          <AddWrapper>
            <ImagePopUp src={popUpPicture} />
          </AddWrapper>
        </AddOverlay>
      }
      </ReviewBodyWrapper>
    </ReviewTile>
  )
}

export default hot(ReviewListEntry)