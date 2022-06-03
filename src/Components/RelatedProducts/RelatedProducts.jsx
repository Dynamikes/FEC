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
} from "../StyledComponents.jsx";

const RelatedProducts = ({ updateID }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loaded, setLoaded] = useState([false]);
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
            photoUrl = singleCardStyle.data.results[0].photos[0].url;
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
  return loaded ? (
    <div>
      <Title> Related Products! </Title>
      <StyledLeftArrow />
      <RelatedProductsWheel>
        {relatedProducts.map((card, index) => (
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
      </RelatedProductsWheel>
      <StyledRightArrow />
    </div>
  ) : null;
};

export default hot(RelatedProducts);
