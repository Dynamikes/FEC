import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import ImageView from "./ImageView.jsx";
import StyleSelector from "./StyleSelector.jsx";
import AddToCart from "./AddToCart.jsx";
import ProductInfo from "./ProductInfo.jsx";
import {
  StyledShare,
  StyledSideBar,
  Wrapper,
  OverviewWrapper,
  StyledImageView,
} from "../StyledComponents.jsx";
export const styleIDContext = React.createContext();
function Overview({ productAdd }) {
  //hook that adds state ttoggle
  //function that toggles state from A to B
  let [toggle, setToggle] = useState(!toggle);
  const [styleID, setStyleID] = useState(null);

  const toggleFunc = () => {
    setToggle(!toggle);
  };
  const changeStyleID = (id) => {
    setStyleID(id);
  };

  return (
    <styleIDContext.Provider value={styleID}>
      <OverviewWrapper className="OverviewWrapper">
        <Wrapper className="Wrapper">
          <StyledImageView className="StyledImageView">
            <ImageView
              click={toggleFunc}
              productAdd={productAdd}
              changeStyleID={changeStyleID}
            />
          </StyledImageView>
          <StyledSideBar>
            {" "}
            <ProductInfo productAdd={productAdd} />
            <StyleSelector click={changeStyleID} />
            <AddToCart />{" "}
            <StyledShare>
              <div
                className="fb-share-button"
                data-href="https://facebook.com"
                data-layout="button_count"
                data-size="small"
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffacebook.com%2F&amp;src=sdkpreparse"
                  className="fb-xfbml-parse-ignore"
                >
                  Share
                </a>
              </div>
              <a
                rel="noReferrer"
                href="//www.pinterest.com/pin/create/button/"
                className="pin-it-button"
                count-layout="none"
                target="_blank"
              >
                <img
                  src="//assets.pinterest.com/images/pidgets/pin_it_button.png"
                  alt="Pin it"
                />{" "}
              </a>
              <a
                className="twitter-share-button"
                rel="noReferrer"
                target="_blank"
                href="https://twitter.com/intent/tweet"
              >
                <img src="" alt="Tweet" />
              </a>
            </StyledShare>
          </StyledSideBar>
        </Wrapper>
      </OverviewWrapper>
    </styleIDContext.Provider>
  );
}

export default hot(Overview);
