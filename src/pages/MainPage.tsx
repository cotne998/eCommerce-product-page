import { useState } from "react";
import styled from "styled-components";
import { IProduct } from "../types";
import PlusIcon from "/images/icon-plus.svg";
import MinusIcon from "/images/icon-minus.svg";
import { useOutletContext } from "react-router-dom";
import { AddedProduct } from "../types";
import { keyframes } from "styled-components";

interface OutletContext {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  addedProduct: AddedProduct;
  setAddedProduct: React.Dispatch<React.SetStateAction<AddedProduct>>;
  displayCart: boolean;
  setDisplayCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const productImages: string[] = [
  "/images/image-product-1.jpg",
  "/images/image-product-2.jpg",
  "/images/image-product-3.jpg",
  "/images/image-product-4.jpg",
];

const product: IProduct = {
  companyName: "SNEAKER COMPANY",
  color: "#FF7E1B",
  offerTitle: "Fall Limited Edition Sneakers",
  textContent:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  price: 125,
  discount: 50,
  oldPrice: 250,
};

export default function MainPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { quantity, setQuantity } = useOutletContext<OutletContext>();
  const { setAddedProduct } = useOutletContext<OutletContext>();
  const [displayAdded, setDisplayAdded] = useState<boolean>(false);
  const { displayCart, setDisplayCart } = useOutletContext<OutletContext>();
  const [displayDesktopProduct, setDisplayDesktopProduct] = useState<string>(
    "/images/image-product-1.jpg"
  );
  const [displayImages, setDisplayImages] = useState([
    {
      id: 1,
      main: "/images/image-product-1.jpg",
      thumbnail: "/images/image-product-1-thumbnail.jpg",
      active: true,
    },
    {
      id: 2,
      main: "/images/image-product-2.jpg",
      thumbnail: "/images/image-product-2-thumbnail.jpg",
      active: false,
    },
    {
      id: 3,
      main: "/images/image-product-3.jpg",
      thumbnail: "/images/image-product-3-thumbnail.jpg",
      active: false,
    },
    {
      id: 4,
      main: "/images/image-product-4.jpg",
      thumbnail: "/images/image-product-4-thumbnail.jpg",
      active: false,
    },
  ]);

  const handleMinusQuantity = () => {
    if (quantity !== 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const handleAddProduct = () => {
    if (quantity === 0) {
      setAddedProduct(null);
      return;
    }

    setAddedProduct({
      offerTitle: product.offerTitle,
      price: product.price,
    });
    setDisplayAdded(true);
    setTimeout(() => {
      setDisplayAdded(false);
    }, 700);
  };

  const handleThumbnail = (id: number) => {
    setDisplayImages((prevImages) =>
      prevImages.map((image) =>
        image.id === id
          ? { ...image, active: true }
          : { ...image, active: false }
      )
    );
    const clickedImage = displayImages.find((image) => image.id === id);
    if (clickedImage) {
      setDisplayDesktopProduct(clickedImage.main);
    }
  };

  return (
    <main
      onClick={() => {
        if (displayCart) {
          setDisplayCart(false);
        }
      }}>
      <SliderContainer>
        <ArrowButton onClick={handlePrev}>
          <img src="/images/icon-previous.svg" alt="" />
        </ArrowButton>
        <ImageWrapper>
          <ImageTrack currentIndex={currentIndex}>
            {productImages.map((image, index) => (
              <ProductImage
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
              />
            ))}
          </ImageTrack>
        </ImageWrapper>
        <ArrowButton onClick={handleNext}>
          <img src="/images/icon-next.svg" alt="" />
        </ArrowButton>
      </SliderContainer>
      <DesktopImages>
        <ProductImageDesktop src={displayDesktopProduct} alt="Product image" />
        <ul style={{ display: "flex", justifyContent: "space-between" }}>
          {displayImages.map((image) => {
            return (
              <DesktopLi
                key={image.id}
                style={{
                  all: "unset",
                  transition: "0.2s",
                  borderColor: image.active ? "#FF7E1B" : "",
                }}>
                <ThumbnailImg
                  style={{
                    opacity: image.active ? "0.3" : "",
                  }}
                  onClick={() => handleThumbnail(image.id)}
                  src={image.thumbnail}
                />
                ;
              </DesktopLi>
            );
          })}
        </ul>
      </DesktopImages>
      <LowerSection>
        <TextDiv>
          <CompanyName>{product.companyName}</CompanyName>
          <OfferTitle>{product.offerTitle}</OfferTitle>
          <TextContent>{product.textContent}</TextContent>
          <PriceWrap>
            <CurrentPriceWrap>
              <Price>${product.price}</Price>
              <Discount>{product.discount}%</Discount>
            </CurrentPriceWrap>
            <OldPrice>${product.oldPrice}</OldPrice>
          </PriceWrap>
        </TextDiv>
        <div className="add-wrap">
          <Quantity>
            <Amount>{quantity}</Amount>
            <Minus onClick={handleMinusQuantity} src={MinusIcon} />
            <Plus onClick={() => setQuantity(quantity + 1)} src={PlusIcon} />
          </Quantity>
          <AddButton onClick={handleAddProduct}>Add to cart</AddButton>
        </div>
      </LowerSection>
      {displayAdded && (
        <AddScreen>
          <h2>Item added</h2>
        </AddScreen>
      )}
    </main>
  );
}

// Styled Components

const DesktopLi = styled.li`
  border: 2px solid rebeccapurple;
`;

const ProductImageDesktop = styled.img`
  width: 44.5rem;
  border-radius: 2rem;
`;

const DesktopImages = styled.div`
  display: none;

  @media only screen and (min-width: 90rem) {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }
`;

const ThumbnailImg = styled.img`
  @media only screen and (min-width: 90rem) {
    width: 8.8rem;
    border-radius: 1.3rem;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
      transition: 0.2s;
    }
  }
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  overflow: hidden;

  @media only screen and (min-width: 90rem) {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const ImageTrack = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.25s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  flex-shrink: 0;
  object-fit: cover;
`;

const ArrowButton = styled.button`
  width: 4rem;
  height: 4rem;
  background-color: #fff;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #333;
  z-index: 10;

  &:first-of-type {
    left: 0.5rem;
  }

  &:last-of-type {
    right: 0.5rem;
  }

  @media only screen and (min-width: 90rem) {
    display: none;
  }
`;

const LowerSection = styled.section`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media only screen and (min-width: 90rem) {
    max-width: 55rem;
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.9rem;
`;

const CompanyName = styled.h2`
  color: ${product.color};
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1.85px;
`;

const OfferTitle = styled.h1`
  font-size: 2.8rem;
  color: #1d2026;

  @media only screen and (min-width: 90rem) {
    font-size: 4.4rem;
  }
`;

const TextContent = styled.p`
  color: #69707d;
  font-size: 1.5rem;
  font-weight: 400;
`;

const PriceWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (min-width: 90rem) {
    flex-direction: column;
    align-items: start;
    gap: 1.3rem;
  }
`;

const Price = styled.span`
  color: #1d2026;
  font-size: 2.8rem;
  font-weight: 700;
`;

const Discount = styled.span`
  color: ${product.color};
  background-color: #ffeee2;
  font-size: 1.6rem;
  padding: 0.7rem 0.8rem;
  border-radius: 0.67rem;
  font-weight: 700;
`;

const CurrentPriceWrap = styled.div`
  display: flex;
  align-items: end;
  gap: 1.6rem;
`;

const OldPrice = styled.span`
  color: #b6bcc8;
  text-decoration: line-through;
  font-size: 1.6rem;
  font-weight: 700;
`;

const Quantity = styled.div`
  width: 100%;
  background-color: #f6f8fd;
  padding: 2.2rem 2.4rem;
  border-radius: 0.8rem;
  text-align: center;
  position: relative;
`;

const Minus = styled.img`
  position: absolute;
  left: 2.4rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Plus = styled.img`
  position: absolute;
  right: 2.4rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Amount = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 2.2rem 10.4rem;
  border-radius: 0.8rem;
  background-color: ${product.color};
  border: none;
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #ffab6a;
    transition: 0.2s;
  }
`;

const bubbleAnimation = keyframes`
  0% {
    transform: translateX(-50%) scale(0);
    opacity: 0;
  }
  30% {
    transform: translateX(-50%) scale(1.1);
  }
  50% {
    transform: translateX(-50%) scale(0.8);
    opacity: 1;
  }
  80% {
    transform: translateX(-50%) scale(0.9);
    opacity: 1;
  }
  90%{
    transform: translateX(-50%) scale(0.8);
  }
  100% {
    transform: translateX(-50%) scale(0);
    opacity: 1;
  }
`;

const AddScreen = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.7rem;
  background-color: #fff;
  padding: 20px;
  width: 60%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-size: 1.8rem;
  animation: ${bubbleAnimation} 0.7s ease-in-out;
  z-index: 1000;
  box-shadow: 0px 10px 15px #00000035;

  @media only screen and (min-width: 90rem) {
    max-width: 50rem;
    top: unset;
    bottom: 10%;
  }
`;
