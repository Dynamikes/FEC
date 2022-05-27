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

const ReviewListEntry = ({review, getReviews, getStars, getStar}) => {

  //not working
  const incrementHelpful = (id) => {
    useEffect(() => {
      axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`,
        method: 'put',
        headers: {
          Authorization: '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',
        },
      })
      getReviews();
    }, []);

  }

  return (
    <ReviewTile>
        <div>
        <div>
          {review.reviewer_name} Verified?*
        </div>
        <div>
        {getStars(review.rating).map((value, index) => (
        <img width={25} src={getStar(value)} key={index}/>
      ))}
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
          <u>Helpful? <u onClick={()=>{incrementHelpful(review.review_id)}}>Yes</u> {`(${review.helpfulness})`}</u>
        </ReviewBodyWrapper>
      </ReviewTile>
  )
}

export default hot(ReviewListEntry)