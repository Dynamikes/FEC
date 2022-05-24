import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

const Reviews = () => {

  const  TotalReviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  `;

  const BreakdownWrapper = styled.div`
  display: flex;
  background-color: red;
  flex-direction: column;
  justify-content: flex-start;
`;

  const ReviewListWrapper = styled.div`
  display: flex;
  background-color: green;
  flex-direction: column;
  flex-grow: 1;
  `

  const ReviewTile = styled.div`
  display: flex;
  background-color: orange;
  flex-direction: column;
  `

  const ReviewBody = styled.div`
  display: flex;
  background-color: purple;
  flex-direction: column;
  `;

  const ImageWrapper = styled.div`
  display: flex;
  background-color: pink;
  flex-direction: row;
  `;

  const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  `

  return(
  <TotalReviewWrapper>
    <BreakdownWrapper>
      --Rating Breakdown--
      <div>
        Start # + average
      </div>
      <div>
        Review bars
      </div>
      <div>
        % recommended
      </div>
      <div>
        breakdown factors
      </div>
    </BreakdownWrapper>
    <ReviewListWrapper>
      --Review List--
      <div>
        # Reviews/sortedBy
      </div>
      <ReviewTile>
        <div>
          Ver / username/ date
        </div>
        <div>response from seller</div>
        <div>star rating</div>
        <p>Review Summary</p>
        <ReviewBody>
          --ReviewBody--
          <p>Review Body 250 chars</p>
          <p>check mark + Recommend this product?</p>
          <ImageWrapper>
            Images Here 5
            <button>Submit Image</button>
          </ImageWrapper>
          <div>was this rating helpful?</div>
        </ReviewBody>
      </ReviewTile>
      <ButtonWrapper><button>More Reviews</button> <button>Add a Review</button></ButtonWrapper>
    </ReviewListWrapper>
  </TotalReviewWrapper>
  );
};

export default hot(Reviews);
