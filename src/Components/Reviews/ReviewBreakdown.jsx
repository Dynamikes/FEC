/* eslint-disable react/prop-types */
import {React, useState} from 'react'
import { hot } from 'react-hot-loader/root';
import {
  ReviewBreakdownWrapper,
  ReviewAverage,
  ProgressBarWrap,
  SliderWrapper,
  SliderInputFit,
  SliderInputQuality,
  SliderInputLength,
  StarBarWrap,
  RecommendWrap,
  RatingHover,
}
from '../StyledComponents.jsx';
import StarRatings from 'react-star-ratings';
import RatingStars from './RatingStars.jsx'
import ProgressBar from "@ramonak/react-progress-bar";


const ReviewBreakdown = ({reviewsMeta, chars, changeStars, reviews, setReviews, reviewsHolder, setReviewsHolder}) => {


  const [fiveClicked, setFive] = useState(false);
  const [fourClicked, setFour] = useState(false);
  const [threeClicked, setThree] = useState(false);
  const [twoClicked, setTwo] = useState(false);
  const [oneClicked, setOne] = useState(false);

  //Variables to hold values
  //Recommended
  const recommended = Number(reviewsMeta.recommended.true);
  const notRecommended = Number(reviewsMeta.recommended.false);
  //Rating stars

  let one = Number(reviewsMeta.ratings[1])
  let two = Number(reviewsMeta.ratings[2])
  let three = Number(reviewsMeta.ratings[3])
  let four = Number(reviewsMeta.ratings[4])
  let five = Number(reviewsMeta.ratings[5])
  let total = one + two + three + four + five

  let fit, value, comfort, length, quality, size;

  for(var key in chars) {
    if(key === 'Fit') {fit = chars['Fit'].value
  }else if (key === 'Comfort') {
    comfort = chars['Comfort'].value
  }else if (key === 'Length') {
    length = chars['Length'].value
  }else if (key === 'Quality') {
    quality = chars['Quality'].value
  }else if (key === 'Size') {
    size = chars['Size'].value
  }else if (key === 'Value') {
    value = chars['Value'].value
  }}


  const average = parseFloat(((one * 1) +( two * 2) + (three * 3) + (four * 4) + (five * 5)) / (total)).toFixed(1)

   changeStars(average)

   const handleStarClick = (val) => {
     if (val === 5) {
      handleFive();
     } else if (val === 4) {
      handleFour();
     } else if (val === 3) {
      handleThree();
     } else if (val === 2) {
      handleTwo();
     } else {
      handleOne();
     }
    };

    const handleFive = () => {
      if (!fiveClicked) {
      let starFive = reviewsHolder.slice()
      setReviews(starFive.filter(review => review.rating === 5))
      setFive(true);
      } else {
      setFive(false)
      }
    };

    const handleFour = () => {
      let starFour = reviewsHolder.slice()
      setReviews(starFour.filter(review => review.rating === 4))
    };

    const handleThree = () => {
      let starThree = reviewsHolder.slice()
      setReviews(starThree.filter(review => review.rating === 3))
    };

    const handleTwo = () => {
      let starTwo = reviewsHolder.slice()
      setReviews(starTwo.filter(review => review.rating === 2))
    };

    const handleOne = () => {
      let starOne = reviewsHolder.slice()
      setReviews(starOne.filter(review => review.rating === 1))
    };

  return (
    <ReviewBreakdownWrapper>
      <ReviewAverage>
        {average}
        <RatingStars value={(Number(Math.round(average * 4) / 4).toFixed(2))}/>
      </ReviewAverage>
      <ProgressBarWrap>
      <StarBarWrap>
        <div> <StarRatings rating={5} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <RatingHover onClick={() => {handleStarClick(5)}}>({five}) Reviews! </RatingHover></div>
            <ProgressBar
              isLabelVisible={false}
              width='65%'
              completed={`${five}`}
              maxCompleted={`${total}`}
              customLabel="-"
              labelColor='green'
              baseBgColor='grey'
              borderRadius='0'
              height='7px'
              bgColor='green'
              margin='5px'
            />
        </StarBarWrap>
        <StarBarWrap>
          <div> <StarRatings rating={4} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <RatingHover onClick={() => handleStarClick(4)}>({four}) Reviews! </RatingHover></div>
            <ProgressBar
              isLabelVisible={false}
              width='65%'
              completed={`${four}`}
              maxCompleted={`${total}`}
              customLabel="-"
              labelColor='green'
              baseBgColor='grey'
              borderRadius='0'
              height='7px'
              bgColor='green'
              margin='5px'
            />
        </StarBarWrap>
        <StarBarWrap>
        <div> <StarRatings rating={3} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <RatingHover onClick={() => handleStarClick(3)}>({three}) Reviews! </RatingHover></div>
            <ProgressBar
              isLabelVisible={false}
              width='65%'
              completed={`${three}`}
              maxCompleted={`${total}`}
              customLabel="-"
              labelColor='green'
              baseBgColor='grey'
              borderRadius='0'
              height='7px'
              bgColor='green'
              margin='5px'
            />
        </StarBarWrap>
        <StarBarWrap>
        <div> <StarRatings rating={2} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <RatingHover onClick={() => handleStarClick(2)}>({two}) Reviews! </RatingHover></div>
            <ProgressBar
              isLabelVisible={false}
              width='65%'
              completed={`${two}`}
              maxCompleted={`${total}`}
              customLabel="-"
              labelColor='green'
              baseBgColor='grey'
              borderRadius='0'
              height='7px'
              bgColor='green'
              margin='5px'
            />
        </StarBarWrap>
        <StarBarWrap>
          <div><StarRatings rating={1} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <RatingHover onClick={() => handleStarClick(1)}>({one}) Reviews! </RatingHover></div>
            <ProgressBar
              isLabelVisible={false}
              width='65%'
              completed={`${one}`}
              maxCompleted={`${total}`}
              customLabel="-"
              labelColor='green'
              baseBgColor='grey'
              borderRadius='0'
              height='7px'
              bgColor='green'
              margin='5px'
            />
            {fiveClicked || fourClicked || threeClicked|| twoClicked|| oneClicked
             ? <small>Filters:{fiveClicked ? ' Five stars': null}</small> : null}
        </StarBarWrap>
      </ProgressBarWrap>
      <RecommendWrap>
        <small>
          {(Math.ceil(recommended / (recommended + notRecommended) * 100))}% of reviews recommend this product.
        </small>
      </RecommendWrap>
      <div>
        {
        fit ?
        <SliderWrapper>
          <div> Fit </div>
            <SliderInputFit type='range' readOnly min='1' max='5' value={fit}/>
        </SliderWrapper>: null
        }
        {
        value ?
        <SliderWrapper>
            <div> Value </div>
            <SliderInputQuality type='range' readOnly min='1' max='5' value={value}/>
          </SliderWrapper>: null
        }
        {
        comfort ?
        <SliderWrapper>
          <div> Comfort </div>
            <SliderInputQuality type='range' readOnly min='1' max='5' value={comfort}/>
        </SliderWrapper> : null
        }
        {
        length ?
        <SliderWrapper>
             <div> Length </div>
            <SliderInputLength type='range' readOnly min='1' max='5' value={length}/>
          </SliderWrapper>: null
       }
        {
        quality ?
        <SliderWrapper>
            <div> Quality </div>
            <SliderInputQuality type='range' readOnly min='1' max='5' value={quality}/>
        </SliderWrapper>: null
        }
        {
        size ?
        <SliderWrapper>
            <div> Size </div>
            <SliderInputFit type='range' readOnly min='1' max='5' value={size}/>
        </SliderWrapper>: null
        }
      </div>
    </ReviewBreakdownWrapper>
  )
}

export default hot(ReviewBreakdown)