import React, { useEffect, useState, useContext } from "react";
import { hot } from "react-hot-loader/root";
import axios from "axios";
import { MAIN_API_KEY } from "../../config.js";
import { prodIDContext } from "../../App.jsx";
// import {
//   StyledLeftArrow,
//   DeadLeftArrow,
//   StyledRightArrow,
//   DeadRightArrow,
// } from "../Overview/ImageView.jsx";
import {
  Title,
  HomePageCard,
  CardImage,
  RelatedProductsWheel,
  StyledLeftArrow,
  DeadLeftArrow,
  StyledRightArrow,
  DeadRightArrow,
  TotalReviewWrapper,
  RelatedProdWrapper
} from "../StyledComponents.jsx";

const RelatedProducts = ({ updateID }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loaded, setLoaded] = useState([false]);
  const [relatedCarData, setRelatedCarData] = useState([0, 5])
  let prodID = useContext(prodIDContext);

  const getRelatedProducts = async () => {
    try {
      let response = await axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodID}/related`,
        method: "get",
        headers: {
          Authorization: MAIN_API_KEY,
        },
      });
      let sub = [];
      if (response.data.length) {
        for (let i = 0; i < response.data.length; i++) {
          let id = response.data[i];
          let singleCardInfo = await axios({
            url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
            method: "get",
            headers: {
              Authorization: MAIN_API_KEY,
            },
          });
          let singleCardStyle = await axios({
            url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
            method: "get",
            headers: {
              Authorization: MAIN_API_KEY,
            },
          });
          let photoUrl;
          if (singleCardStyle.data.results.length > 0) {
            if (singleCardStyle.data.results[0].photos[0].url) {
            photoUrl = singleCardStyle.data.results[0].photos[0].url;
            } else {
              photoUrl = 'https://images.unsplash.com/photo-1529108750117-bcbad8bd25dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=662&q=80'
            }
          }
          let temp = {
            id: id,
            name: singleCardInfo.data.name,
            price: singleCardInfo.data["default_price"],
            image: photoUrl,
          };
          sub.push(temp);
        }
      }
      console.log(sub);
      await setRelatedProducts(sub);
      await setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRelatedProducts();
  }, [prodID]);

  const changeRelatedCarData = (direction) => {
    if (direction === 'right') {
      setRelatedCarData([relatedCarData[0] + 1, relatedCarData[1] + 1])
    } else if (direction === 'left') {
      setRelatedCarData([relatedCarData[0] - 1, relatedCarData[1] - 1])
    }
  }
  return loaded ? (
    <TotalReviewWrapper>
      <Title> Related Products! </Title>
      
      <RelatedProductsWheel>
        
      {relatedProducts.length > 5 ? (
        relatedCarData[0] === 0 ? (
      <DeadLeftArrow />
      ) : (
      <StyledLeftArrow 
      className = "related-left-arrow"
      onClick={() => changeRelatedCarData("left")}
      />)): <DeadLeftArrow />}
      
      
        {relatedProducts.slice(relatedCarData[0], relatedCarData[1]).map((card, index) => (
          <HomePageCard
            key={index}
            onClick={() => {
              updateID(card.id);
            }}
          >
            <p>{card.name}</p>
            <div>
              <CardImage src={card.image} />
            </div>
            <p>{"$" + card.price}</p>
          </HomePageCard>
        ))}
       
      {relatedProducts.length > 5 ? (
      relatedCarData[1] === relatedProducts.length ? (
        <DeadRightArrow />
        ) : (
        <StyledRightArrow 
        className = "related-right-arrow"
        onClick={() => changeRelatedCarData("right")}
        />)) : null}
      </RelatedProductsWheel>
      
    </TotalReviewWrapper>
  ) : null;
};

export default hot(RelatedProducts);
