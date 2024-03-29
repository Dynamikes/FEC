/* eslint-disable react/prop-types */
import { useContext, useState, React } from "react";
import { hot } from "react-hot-loader/root";
import {
  ReviewListWrapper,
  ReviewButtonWrapper,
  Title,
  SubmitButton,
  StarRatingList,
  StarRow,
  ReviewMap,
  RadioAdd,
  CharAdd,
  ReviewsSearch,
  SearchBarWrapper,
  StyledSearchIcon,
  QAButtons,
  AnswerPhoto,
  AnswerPhotos,
  SelectorAddWrapper,
  AnswerFormDivs,
  OneLineInputs,
} from "../StyledComponents.jsx";
import ReviewListEntry from "./ReviewListEntry";
import AddReview from "./AddReview.jsx";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { MAIN_API_KEY, IMG_API_KEY } from "../../config.js";
import { prodIDContext } from "../../App.jsx";
import { productForAdd } from "../../App.jsx";

const ReviewList = ({
  reviews,
  getReviews,
  reviewsHolder,
  setReviews,
  chara,
  prodID,
}) => {

  const product = useContext(productForAdd);

  //State for various items
  const [reviewCount, setReviewCount] = useState(2);
  const [addIsOpen, setAdd] = useState(false);
  const [addUsername, setUser] = useState("");
  const [addSummary, setSummary] = useState("");
  const [addBody, setBody] = useState("");
  const [addEmail, setEmail] = useState("");
  const [addRecommend, setRecommend] = useState(null);
  const [addStar, setStar] = useState(0);
  const [addFit, setAddFit] = useState("none selected");
  const [fitValue, setFitValue] = useState(null);
  const [addValue, setAddValue] = useState("none selected");
  const [valueValue, setValueValue] = useState(null);
  const [addComfort, setAddComfort] = useState("none selected");
  const [comfortValue, setComfortValue] = useState(null);
  const [addQuality, setAddQuality] = useState("none selected");
  const [qualityValue, setQualityValue] = useState(null);
  const [addLength, setAddLength] = useState("none selected");
  const [lengthValue, setLengthValue] = useState(null);
  const [addSize, setAddSize] = useState("none selected");
  const [sizeValue, setSizeValue] = useState(null);
  const [addImages, setImages] = useState([]);
  const [addPhotoUrls, setAddPhotoUrls] = useState([]);
  const [option, setOption] = useState("Sort on");

  //Characteristics
  //Helpful
  let fitAdd;
  let fitId;
  let valueAdd;
  let valueId;
  let comfortAdd;
  let comfortId;
  let lengthAdd;
  let lengthId;
  let qualityAdd;
  let qualityId;
  let sizeAdd;
  let sizeId;
  let charas = chara;

  let productId = useContext(prodIDContext);

  for (var key in charas) {
    if (key === "Fit") {
      fitAdd = charas["Fit"].value;
      fitId = charas["Fit"].id;
    } else if (key === "Comfort") {
      comfortAdd = charas["Comfort"].value;
      comfortId = charas["Comfort"].id;
    } else if (key === "Length") {
      lengthAdd = charas["Length"].value;
      lengthId = charas["Length"].id;
    } else if (key === "Quality") {
      qualityAdd = charas["Quality"].value;
      qualityId = charas["Quality"].id;
    } else if (key === "Size") {
      sizeAdd = charas["Size"].value;
      sizeId = charas["Size"].id;
    } else if (key === "Value") {
      valueAdd = charas["Value"].value;
      valueId = charas["Value"].id;
    }
  }

  //Fuctions for Add Review
  const countChars = (obj) => {
    if (obj.target.value.length < 50) {
      document.getElementById("count-body").innerHTML =
        "Minimum required characters left:" + (50 - obj.target.value.length);
    } else {
      document.getElementById("count-body").innerHTML = "Minimum reached";
    }
  };

  const changeOption = (e) => {
    if (e.target.value === "Helpful") {
      setOption("Helpful");
      helpfulSorter();
    } else if (e.target.value === "Newest") {
      setOption("Newest");
      newestSorter();
    } else if (e.target.value === "Relevant") {
      setOption("Relevant");
      relevantSorter();
    }
  };

  const newestSorter = () => {
    let newReviews = reviews.slice();
    newReviews.sort((a, b) => {
      return a.date < b.date ? 1 : -1;
    });
    setReviews(newReviews);
  };

  const helpfulSorter = () => {
    let helpfulSort = reviews.slice();
    helpfulSort.sort((a, b) => (a["helpfulness"] < b["relevant"] ? 1 : -1));
    setReviews(helpfulSort);
  };

  const relevantSorter = () => {
    let relevantSort = reviews.slice();
    relevantSort.sort((a, b) => (a["relevant"] < b["relevant"] ? 1 : -1));
    setReviews(relevantSort);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePhotos = async (e) => {
    e.preventDefault();
    try {
      const file64 = await getBase64(e.target.files[0]);
      let body = new FormData();
      body.append("image", file64);
      await axios({
        url: `https://api.imgbb.com/1/upload?expiration=600&key=${IMG_API_KEY}`,
        method: "post",
        data: body,
      }).then((results) => {
        if (typeof results["data"]["data"]["url"] === "string") {
          setAddPhotoUrls([...addPhotoUrls, results["data"]["data"]["url"]]);
        }
      });
    } catch (err) {
      console.log(err);
      return;
    }
    setImages([...addImages, e.target.files["0"]]);
  };

  const submitAdd = (e) => {
    e.preventDefault();
    let addReviewContent = {
      product_id: productId,
      rating: addStar,
      summary: addSummary,
      body: addBody,
      recommend: addRecommend,
      name: addUsername,
      email: addEmail,
      photos: addPhotoUrls,
      characteristics: {
        //  fitId: fitValue,
        //  comfortId: comfortValue,
        //  valueId: valueValue,
        //  sizeId: sizeValue,
        //  lengthId: lengthValue,
        //  qualityId: qualityValue
      },
    };
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${prodID}`,
      method: "post",
      headers: {
        Authorization: MAIN_API_KEY,
      },
      data: addReviewContent,
    })
      .then(() => {
        alert("Review successfully submitted!");
        setAdd(false);
      })
      .then(() => {
        getReviews();
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Incorrect submission! Please ensure all fields are appropriately filled"
        );
      });
  };

  const searched = (e) => {
    e.preventDefault();
    e.target.search.value = "";
  };

  const whileSearching = (e) => {
    let searchStr = e.target.value.toLowerCase();
    if (searchStr.length > 2) {
      let searchedReviews = [];
      for (let i = 0; i < reviewsHolder.length; i++) {
        if (
          reviewsHolder[i]["body"].toLowerCase().includes(searchStr) ||
          reviewsHolder[i]["reviewer_name"].toLowerCase().includes(searchStr) ||
          reviewsHolder[i]["summary"].toLowerCase().includes(searchStr)
        ) {
          searchedReviews.push(reviewsHolder[i]);
        }
      }
      setReviews(searchedReviews);
    } else {
      setReviews(reviewsHolder);
    }
  };

  return (
    <ReviewListWrapper>
      <SearchBarWrapper
        onSubmit={(e) => {
          searched(e);
        }}
      >
        <StyledSearchIcon />
        <ReviewsSearch
          type="text"
          name="search"
          placeholder="Filter reviews here!"
          onChange={(e) => {
            whileSearching(e);
          }}
        />
        <input
          type="submit"
          value="x"
          onClick={() => {
            setReviews(reviewsHolder);
          }}
        />
      </SearchBarWrapper>
      <SelectorAddWrapper>
        {reviews.length} Reviews, Sort on -
        <select value={option} onChange={changeOption}>
          <option value="Relevant">Relevant</option>
          <option value="Newest">Newest</option>
          <option value="Helpful">Helpful</option>
        </select>
        -
      </SelectorAddWrapper>
      <ReviewMap>
        {reviews.slice(0, reviewCount).map((review, index) => (
          <ReviewListEntry
            getReviews={getReviews}
            key={index}
            review={review}
            reviews={reviews}
          />
        ))}
      </ReviewMap>
      <ReviewButtonWrapper>
        {reviewCount < reviews.length && reviews.length > 2 ? (
          <QAButtons
            onClick={() => {
              setReviewCount(reviewCount + 2);
            }}
          >
            More Reviews
          </QAButtons>
        ) : null}
        <QAButtons
          onClick={() => {
            setAdd(true);
          }}
        >
          Add a Review
        </QAButtons>
        <AddReview open={addIsOpen} onClose={() => setAdd(false)}>
          <form onSubmit={submitAdd}>
            <AnswerFormDivs>
              <Title>Write Your Review for the {product}</Title>
            </AnswerFormDivs>
            <StarRow>
              <AnswerFormDivs>
                <StarRatings
                  rating={addStar}
                  starRatedColor="gold"
                  starDimension={"25px"}
                  starSpacing={"2px"}
                  changeRating={(e) => {
                    setStar(e);
                  }}
                  required
                />
              </AnswerFormDivs>
              {addStar > 0 ? (
                <StarRatingList>
                  <div>1 star - Poor</div>
                  <div>2 stars - Fair</div>
                  <div>3 stars - Average</div>
                  <div>4 stars - Good</div>
                  <div>5 stars - Great</div>
                </StarRatingList>
              ) : null}
            </StarRow>
            <AnswerFormDivs required>
              Do you recommend this product?
            </AnswerFormDivs>
            <RadioAdd>
              <div>Yes:</div>
              <input
                onClick={() => setRecommend(true)}
                required
                type="radio"
                name="addAnswer"
              />
              <div>No:</div>
              <input
                onClick={() => setRecommend(false)}
                required
                type="radio"
                name="addAnswer"
              />
            </RadioAdd>
            <CharAdd>
              {fitAdd ? (
                <AnswerFormDivs>
                  <u>Fit: {addFit}</u>
                  <div>
                    <small>Runs tight</small>
                    <input
                      onClick={() => {
                        setAddFit("Runs tight"), setFitValue(1);
                      }}
                      required
                      type="radio"
                      name="addFit"
                    />
                    <input
                      onClick={() => {
                        setAddFit("Runs slightly tight"), setFitValue(2);
                      }}
                      required
                      type="radio"
                      name="addFit"
                    />
                    <input
                      onClick={() => {
                        setAddFit("Perfect"), setFitValue(3);
                      }}
                      required
                      type="radio"
                      name="addFit"
                    />
                    <input
                      onClick={() => {
                        setAddFit("Runs slightly long"), setFitValue(4);
                      }}
                      required
                      type="radio"
                      name="addFit"
                    />
                    <input
                      onClick={() => {
                        setAddFit("Runs long"), setFitValue(5);
                      }}
                      required
                      type="radio"
                      name="addFit"
                    />
                    <small>Runs long</small>
                  </div>
                </AnswerFormDivs>
              ) : null}
              {valueAdd ? (
                <AnswerFormDivs>
                  <u>Value: {addValue}</u>
                  <div>
                    <small>Too narrow</small>
                    <input
                      onClick={() => {
                        setAddValue("Too narrow"), setValueValue(1);
                      }}
                      required
                      type="radio"
                      name="addValue"
                    />
                    <input
                      onClick={() => {
                        setAddValue("Slightly narrow"), setValueValue(2);
                      }}
                      required
                      type="radio"
                      name="addValue"
                    />
                    <input
                      onClick={() => {
                        setAddValue("Perfect"), setValueValue(3);
                      }}
                      required
                      type="radio"
                      name="addValue"
                    />
                    <input
                      onClick={() => {
                        setAddValue("Slightly wide"), setValueValue(4);
                      }}
                      required
                      type="radio"
                      name="addValue"
                    />
                    <input
                      onClick={() => {
                        setAddValue("Too wide"), setValueValue(5);
                      }}
                      required
                      type="radio"
                      name="addValue"
                    />
                    <small>Too wide</small>
                  </div>
                </AnswerFormDivs>
              ) : null}
              {comfortAdd ? (
                <AnswerFormDivs>
                  <u>Comfort: {addComfort}</u>
                  <div>
                    <small>Uncomfortable</small>
                    <input
                      onClick={() => {
                        setAddComfort("Uncomfortable"), setComfortValue(1);
                      }}
                      required
                      type="radio"
                      name="addComfort"
                    />
                    <input
                      onClick={() => {
                        setAddComfort("Slightly uncomfortable"),
                          setComfortValue(2);
                      }}
                      required
                      type="radio"
                      name="addComfort"
                    />
                    <input
                      onClick={() => {
                        setAddComfort("Ok"), setComfortValue(3);
                      }}
                      required
                      type="radio"
                      name="addComfort"
                    />
                    <input
                      onClick={() => {
                        setAddComfort("Comfortable"), setComfortValue(4);
                      }}
                      required
                      type="radio"
                      name="addComfort"
                    />
                    <input
                      onClick={() => {
                        setAddComfort("Perfect"), setComfortValue(5);
                      }}
                      required
                      type="radio"
                      name="addComfort"
                    />
                    <small>Perfect</small>
                  </div>
                </AnswerFormDivs>
              ) : null}
              {qualityAdd ? (
                <AnswerFormDivs>
                  <u>Quality: {addQuality}</u>
                  <div>
                    <small>Uncomfortable</small>
                    <input
                      onClick={() => {
                        setAddQuality("Uncomfortable"), setQualityValue(1);
                      }}
                      required
                      type="radio"
                      name="addQuality"
                    />
                    <input
                      onClick={() => {
                        setAddQuality("Slightly uncomfortable"),
                          setQualityValue(2);
                      }}
                      required
                      type="radio"
                      name="addQuality"
                    />
                    <input
                      onClick={() => {
                        setAddQuality("Ok"), setQualityValue(3);
                      }}
                      required
                      type="radio"
                      name="addQuality"
                    />
                    <input
                      onClick={() => {
                        setAddQuality("Comfortable"), setQualityValue(4);
                      }}
                      required
                      type="radio"
                      name="addQuality"
                    />
                    <input
                      onClick={() => {
                        setAddQuality("Perfect"), setQualityValue(5);
                      }}
                      required
                      type="radio"
                      name="addQuality"
                    />
                    <small>Perfect</small>
                  </div>
                </AnswerFormDivs>
              ) : null}
              {lengthAdd ? (
                <AnswerFormDivs>
                  <u>Length: {addLength}</u>
                  <div>
                    <small>Runs short</small>
                    <input
                      onClick={() => {
                        setAddLength("Runs short"), setLengthValue(1);
                      }}
                      required
                      type="radio"
                      name="addLength"
                    />
                    <input
                      onClick={() => {
                        setAddLength("Runs slightly short"), setLengthValue(2);
                      }}
                      required
                      type="radio"
                      name="addLength"
                    />
                    <input
                      onClick={() => {
                        setAddLength("Perfect"), setLengthValue(3);
                      }}
                      required
                      type="radio"
                      name="addLength"
                    />
                    <input
                      onClick={() => {
                        setAddLength("Runs slightly long"), setLengthValue(4);
                      }}
                      required
                      type="radio"
                      name="addLength"
                    />
                    <input
                      onClick={() => {
                        setAddLength("Runs long"), setLengthValue(5);
                      }}
                      required
                      type="radio"
                      name="addLength"
                    />
                    <small>Runs long</small>
                  </div>
                </AnswerFormDivs>
              ) : null}
              {sizeAdd ? (
                <AnswerFormDivs>
                  <u>Size: {addSize}</u>
                  <div>
                    <small>Runs tight</small>
                    <input
                      onClick={() => {
                        setAddSize("Runs tight"), setSizeValue(1);
                      }}
                      required
                      type="radio"
                      name="addSize"
                    />
                    <input
                      onClick={() => {
                        setAddSize("Runs slightly tight"), setSizeValue(2);
                      }}
                      required
                      type="radio"
                      name="addSize"
                    />
                    <input
                      onClick={() => {
                        setAddSize("Perfect"), setSizeValue(3);
                      }}
                      required
                      type="radio"
                      name="addSize"
                    />
                    <input
                      onClick={() => {
                        setAddSize("Runs slightly long"), setSizeValue(4);
                      }}
                      required
                      type="radio"
                      name="addSize"
                    />
                    <input
                      onClick={() => {
                        setAddSize("Runs long"), setSizeValue(5);
                      }}
                      required
                      type="radio"
                      name="addSize"
                    />
                    <small>Runs long</small>
                  </div>
                </AnswerFormDivs>
              ) : null}
            </CharAdd>
            <AnswerFormDivs>
              <div>Summary</div>
              <textarea
                required
                maxLength="60"
                onChange={(e) => setSummary(e.target.value)}
                cols="80"
                rows="4"
                placeholder="Example: Best purchase ever!"
              />
            </AnswerFormDivs>
            <AnswerFormDivs>
              <div>Body</div>
              <textarea
                required
                onChange={(e) => setBody(e.target.value)}
                cols="80"
                rows="12"
                onKeyUp={(e) => countChars(e)}
                id="add-body"
                placeholder="Why did you like the product or not?"
                maxLength="1000"
                minLength="50"
              />
            </AnswerFormDivs>
            <AnswerFormDivs id="count-body"></AnswerFormDivs>
            <AnswerFormDivs>
              <AnswerFormDivs>Images Added</AnswerFormDivs>
              <input
                type="file"
                disabled={addImages.length <= 4 ? false : true}
                accept="image/*"
                onChange={handlePhotos}
              />
              <AnswerPhotos>
                {addImages.length === 0
                  ? null
                  : addImages.map((photo, index) => (
                      <AnswerPhoto
                        key={index}
                        src={URL.createObjectURL(photo)}
                      />
                    ))}
              </AnswerPhotos>
            </AnswerFormDivs>
            <AnswerFormDivs>
              <div>Your Username</div>
              <OneLineInputs
                required
                onChange={(e) => setUser(e.target.value)}
                placeholder="Example: jackson11!"
                maxLength="60"
              />
              <div>
                <small>
                  For privacy reasons, do not use your full name or email
                </small>
              </div>
            </AnswerFormDivs>
            <AnswerFormDivs>
              <div>Your Email</div>
              <OneLineInputs
                required
                maxLength="60"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example: jackson11@email.com"
              />
              <div>
                <small>
                  For authentification reasons, you will not be emailed
                </small>
              </div>
            </AnswerFormDivs>
            <SubmitButton id="FormSubmit" type="submit">
              {" "}
              Submit Review{" "}
            </SubmitButton>
          </form>
        </AddReview>
      </ReviewButtonWrapper>
    </ReviewListWrapper>
  );
};

export default hot(ReviewList);
