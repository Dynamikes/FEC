/* eslint-disable react/prop-types */
import {React, useState, useEffect} from 'react'
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
  RemoveFilter
}
from '../StyledComponents.jsx';
import StarRatings from 'react-star-ratings';
import RatingStars from './RatingStars.jsx'
import ProgressBar from "@ramonak/react-progress-bar";


const ReviewBreakdown = ({reviewsMeta, chars, changeStars, setReviews,reviewsHolder}) => {

  const [starReviewObj, setStarReviewObj] = useState({});

  //Variables to hold values
  //Recommended
  const recommended = Number(reviewsMeta.recommended.true);
  const notRecommended = Number(reviewsMeta.recommended.false);
  //Rating stars

  let one = Number(reviewsMeta.ratings[1]) || 0
  let two = Number(reviewsMeta.ratings[2]) || 0
  let three = Number(reviewsMeta.ratings[3]) || 0
  let four = Number(reviewsMeta.ratings[4]) || 0
  let five = Number(reviewsMeta.ratings[5]) || 0
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


  let average = parseFloat(((one * 1) +( two * 2) + (three * 3) + (four * 4) + (five * 5)) / (total)).toFixed(1);

   changeStars(average);

   useEffect(() => {
     if (reviewsHolder.length > 0){
       let objLength = Object.keys(starReviewObj).length;
     let reviewCopy = reviewsHolder.slice()

     if (objLength > 0) {
       let rate = reviewCopy.filter((item) =>
         item.rating === starReviewObj[String(item.rating)]
      )
      setReviews(rate)
     } else {
      setReviews(reviewsHolder)
     }}
   }, [starReviewObj])

    const StarAdder = (e) => {
      let objCopy = {...starReviewObj}
      if (objCopy[e]) {
        delete objCopy[e]
      }else {
        objCopy[e] = Number(e)
      }
      setStarReviewObj(objCopy);
    }

    const handleFilter = () => {
      setReviews(reviewsHolder);
      setStarReviewObj({});
    }

  return (
    <ReviewBreakdownWrapper>
      <ReviewAverage>
        {average}
        <RatingStars value={(Number(Math.round(average * 4) / 4).toFixed(2))}/>
      </ReviewAverage>
      <ProgressBarWrap>
      <StarBarWrap>
        <div> <StarRatings rating={5} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <RatingHover onClick={() => StarAdder(5)}>({five}) Reviews! </RatingHover></div>
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
          <div> <StarRatings rating={4} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <RatingHover onClick={() => StarAdder(4)}>({four}) Reviews! </RatingHover></div>
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
        <div> <StarRatings rating={3} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <RatingHover onClick={() => StarAdder(3)}>({three}) Reviews! </RatingHover></div>
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
        <div> <StarRatings rating={2} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <RatingHover onClick={() => StarAdder(2)}>({two}) Reviews! </RatingHover></div>
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
          <div><StarRatings rating={1} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <RatingHover onClick={() => StarAdder(1)}>({one}) Reviews! </RatingHover></div>
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
            {Object.keys(starReviewObj).length !== 0 ? <small><u>Current Filters </u></small> : null}
            <small>{Object.keys(starReviewObj).map((key)=> {return `${key} ★| `})}</small>
            {Object.keys(starReviewObj).length !== 0 ? <small> <RemoveFilter onClick={() => handleFilter()} >Remove all filters</RemoveFilter> </small> : null}
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