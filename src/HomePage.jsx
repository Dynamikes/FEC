import React, {useState, useEffect, useContext} from 'react';
import { hot } from 'react-hot-loader/root';
import {allProductsContext, pageContext } from './App.jsx'
import {
  StyledPageTitle,
  ThumbnailImage,
  HomePageFlex,
  HomePageCard,
  CardImage,
  AddSummaryWrapper
} from './Components/StyledComponents.jsx';
import { MAIN_API_KEY } from './config.js';
import axios from 'axios';
import styled from 'styled-components';


const HomePage = (props) => {
  const loadedProducts = useContext(allProductsContext);
  const page = useContext(pageContext);
  const [allProducts, setAllProducts] = useState([... loadedProducts]);
  const [loaded, setLoaded] = useState([null])
  const [currentPage, setCurrentPage] = useState(page);


  const getAllProducts = async () => {
    try {
      let response = await axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products?page=${page + 1}`,
        method: 'get',
        headers: {
          Authorization: MAIN_API_KEY,
        },
      })
      let sub = [... allProducts];
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
      if (loadedProducts.length === 0 ) {
        getAllProducts();
        setLoaded(true);
       }
       else {
        setAllProducts(loadedProducts);
        setLoaded(true)
      }
    }, [])
    useEffect(() => {
      console.log('page updated:', page);
      if (page === currentPage + 1) {
        getAllProducts();
        setLoaded(true);
        setCurrentPage(currentPage + 1)
      }
    }, [page])

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
      <AddSummaryWrapper className='ScuffedButtonWrapper'>
        <LoadMoreProducts onClick={() => {props.incrementPage()}}> Load More Products! </LoadMoreProducts>
      </AddSummaryWrapper>
    </div>
  ) : null

}
const LoadMoreProducts = styled.button`
  margin: 10px auto;
  padding: 5px 10px;
`;

export default hot(HomePage);