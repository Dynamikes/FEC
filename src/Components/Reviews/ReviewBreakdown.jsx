/* eslint-disable react/prop-types */
import React from 'react'
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
}
from '../StyledComponents.jsx';
import StarRatings from 'react-star-ratings';
import RatingStars from './RatingStars.jsx'
import ProgressBar from "@ramonak/react-progress-bar";


const ReviewBreakdown = ({reviewsMeta, chars}) => {
  //Variables to hold values
  //Recommended
  // eslint-disable-next-line react/prop-types
  const recommended = Number(reviewsMeta.recommended.true);
  const notRecommended = Number(reviewsMeta.recommended.false);
  //Rating stars

  let one = Number(reviewsMeta.ratings[1])
  let two = Number(reviewsMeta.ratings[2])
  let three = Number(reviewsMeta.ratings[3])
  let four = Number(reviewsMeta.ratings[4])
  let five = Number(reviewsMeta.ratings[5])
  let total = one + two + three + four + five

  let fit
  let value
  let comfort
  let length
  let quality
  let size

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


  return (
    <ReviewBreakdownWrapper>
      <ReviewAverage>
        {average}
        <RatingStars value={(Number(Math.round(average * 4) / 4).toFixed(2))}/>
      </ReviewAverage>
      <ProgressBarWrap>
        <StarBarWrap>
        <div><StarRatings rating={1} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <small>({one}) Reviews! </small></div>
            <ProgressBar
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
        </StarBarWrap>
        <StarBarWrap>
        <div> <StarRatings rating={2} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <small>({two}) Reviews! </small></div>
            <ProgressBar
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
        <div> <StarRatings rating={3} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <small>({three}) Reviews! </small></div>
            <ProgressBar
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
          <div> <StarRatings rating={4} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <small>({four}) Reviews! </small></div>
            <ProgressBar
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
        <div> <StarRatings rating={5} starRatedColor='gold' starDimension='15px' starSpacing='2px'/> <small>({five}) Reviews! </small></div>
            <ProgressBar
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
      </ProgressBarWrap>
      <RecommendWrap>
        <small>
          {(Math.ceil(recommended / (recommended + notRecommended) * 100))}% of reviews recommend this product.
        </small>
      </RecommendWrap>
      <div>
        {
        fit ?
        <div>
          <u>Fit</u>
           <div>
           <SliderWrapper>
            <SliderInputFit type='range' min='1' max='5' value='fit'/>
          </SliderWrapper>
           </div>
        </div>: null
        }
        {
        value ?
        <div>
          <u>Value</u>
          <div>
          <SliderWrapper>
            <SliderInputQuality type='range' min='1' max='5' value='value'/>
          </SliderWrapper>
          </div>
        </div>: null
        }
        {
        comfort ?
        <div>
          <u>Comfort</u>
          <div>
          <SliderWrapper>
            <SliderInputQuality type='range' min='1' max='5' value='comfort'/>
          </SliderWrapper>
          </div>
        </div>: null
        }
        {
        length ?
        <div>
          <u>Length</u>
           <div>
           <SliderWrapper>
            <SliderInputLength type='range' min='1' max='5' value='length'/>
          </SliderWrapper>
          </div>
       </div>: null
       }
        {
        quality ?
        <div>
          <u>Quality</u>
          <div>
          <SliderWrapper>
            <SliderInputQuality type='range' min='1' max='5' value='quality'/>
          </SliderWrapper>
          </div>
        </div>: null
          }
        {
        size ?
        <div>
          <u>Size</u>
          <div>
          <SliderWrapper>
            <SliderInputFit type='range' min='1' max='5' value='size'/>
          </SliderWrapper>
          </div>
        </div>: null
        }
      </div>
    </ReviewBreakdownWrapper>
  )
}

export default hot(ReviewBreakdown)