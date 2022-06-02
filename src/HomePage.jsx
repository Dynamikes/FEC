import React, {useState, useEffect, useContext} from 'react';
import { hot } from 'react-hot-loader/root';
import Overview from './Components/Overview/Overview.jsx';
import Reviews from './Components/Reviews/Reviews.jsx';
import RelatedProducts from './Components/RelatedProducts/RelatedProducts.jsx';
import QA from './Components/QA/QA.jsx';
import PropTypes from 'prop-types';
import {allProductsContext} from './App.jsx'
import {
  StyledPageTitle,
  ThumbnailImage,

} from './Components/StyledComponents.jsx';
import { MAIN_API_KEY } from './config.js';
import axios from 'axios';
import styled from 'styled-components';

const HomePageFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: flex-start;
  align-content: space-between;
  max-width: 80%;
`;
const HomePageCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px grey solid;
  padding: 5px;
  margin: 10px;
  height: 20vh;
  width: 20vh;
  box-shadow: 3px 3px black;
`;
const CardImage = styled(ThumbnailImage)`
  height: 100px;
  width: 100px;
  object-fit: contain;
  object-position: 50% 50%;
`;

const HomePage = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loaded, setLoaded] = useState([null])
  const loadedProducts = useContext(allProductsContext);
  const getAllProducts = async () => {
    try {
      let response = await axios({
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products?count=20',
        method: 'get',
        headers: {
          Authorization: MAIN_API_KEY,
        },
      })
      let sub = [];
      if (response.data.length) {
        for (let i = 0; i < response.data.length; i++) {
          let id = response.data[i].id;
          let imageHolder = await axios ({
            url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
            method: 'get',
            headers: {
              Authorization: MAIN_API_KEY,
            },
          })
          let photoUrl;
          if (imageHolder.data.results.length > 0) {
            photoUrl = imageHolder.data.results[0].photos[0].url;
          }
          let temp = {
            'id' : id,
            'name' : response.data[i].name,
            'price' : response.data[i]['default_price'],
            'image' : photoUrl
          };
          sub.push(temp);
        }
      }
      await setAllProducts(sub);
      await props.updateAllProducts(sub)
    } catch (e) {console.log(e)}
  };
    useEffect(() => {
      if (loadedProducts.length === 0) {
      getAllProducts();
      setLoaded(true);
      } else {
        setAllProducts(loadedProducts)
        setLoaded(true)
      }
    }, [])

  return loaded ? (
    <div >
      <StyledPageTitle> Welcome to Chili's! 🌶️  </StyledPageTitle>
      <HomePageFlex>
        {allProducts.map((card, index)=>(
          <HomePageCard key={index} onClick={()=>{props.updateID(card.id)}}>
            <p>{card.name}</p>
            <div >
              <CardImage src={card.image} />
            </div>
            <p>{'$' + card.price}</p>
        </HomePageCard>
        ))}
      </HomePageFlex>
    </div>
  ) : null

}

export default hot(HomePage);