/* eslint-disable react/prop-types */
import { hot } from "react-hot-loader/root";
import ReviewBreakdown from "./ReviewBreakdown.jsx";
import axios from "axios";
import { useState, useEffect, React, useContext } from "react";
import ReviewList from "./ReviewList.jsx";
import {
  TotalReviewWrapper,
  Title,
  InnerReviewWrapper,
} from "../StyledComponents.jsx";
import { MAIN_API_KEY } from "../../config.js";
import { prodIDContext } from "../../App.jsx";

const Reviews = ({ changeStars }) => {
  //States for user reviews / Meta data
  const [reviews, setReview] = useState([]);
  const [reviewsHolder, setReviewsHolder] = useState([]);
  const [reviewsMeta, setReviewMeta] = useState({
    recommended: { true: null, false: null },
    ratings: { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5" },
  });
  const [chars, setChars] = useState({
    Size: 1,
    Width: 1,
    Comfort: 1,
    Quality: 1,
    Length: 1,
    Fit: 1,
  });
  const [loadedChars, setLoadedChars] = useState(false);

  let prodID = useContext(prodIDContext);

  //helper functions
  const getReviews = () => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${prodID}&&count=1000`,
      method: "get",
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
      .then((response) => {
        setReview(response.data.results);
        setReviewsHolder(response.data.results);
      })
      .catch((err) => {
        console.log("Breaking in Review GET. Err:", err);
      });
  };

  const getMeta = () => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${prodID}`,
      method: "get",
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
      .then((response) => {
        setChars(response.data.characteristics);
        setReviewMeta(response.data);
      })
      .then(() => {
        setLoadedChars(true);
      })
      .catch((err) => {
        console.log("Breaking in ReviewMeta GET. Err:", err);
      });
  };

  //Get for reviews user data
  useEffect(() => {
    getReviews();
  }, [prodID]);

  //Get for reviews Meta Data
  useEffect(() => {
    getMeta();
  }, [prodID]);

  let chara;
  if (loadedChars) {
    chara = chars;
  }

  return (
    <TotalReviewWrapper>
      <Title> Ratings and Reviews </Title>
      {loadedChars ? (
        <InnerReviewWrapper>
          <ReviewBreakdown
            reviewsMeta={reviewsMeta}
            chars={chara}
            changeStars={changeStars}
            reviews={reviews}
            setReviews={setReview}
            reviewsHolder={reviewsHolder}
            setReviewsHolder={setReviewsHolder}
          />
          <ReviewList
            reviews={reviews}
            reviewsHolder={reviewsHolder}
            getReviews={getReviews}
            chara={chara}
            setReviews={setReview}
            prodID={prodID}
          />
        </InnerReviewWrapper>
      ) : null}
    </TotalReviewWrapper>
  );
};

export default hot(Reviews);
