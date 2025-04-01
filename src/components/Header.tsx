import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import MenuIcon from "/images/icon-menu.svg";
import LogoIcon from "/images/logo.svg";
import CartIcon from "/images/icon-cart.svg";
import AvatarImg from "/images/image-avatar.png";
import { useState } from "react";
import CloseIcon from "/images/icon-close.svg";
import { HeaderProps } from "../types";
import ProductThumbnail from "/images/image-product-1-thumbnail.jpg";

const navigation: string[] = [
  "Collections",
  "Men",
  "Women",
  "About",
  "Contact",
];

export default function Header({
  quantity,
  addedProduct,
  displayCart,
  setDisplayCart,
  setAddedProduct,
}: HeaderProps) {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>("");
  const [displayThankYou, setDisplayThankYou] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setDisplayMenu(true);
  };

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setDisplayMenu(false);
      setIsClosing(false);
    }, 200);
  };

  const handleDisplayCart = () => {
    setDisplayCart(!displayCart);
  };

  const handleCheckOut = () => {
    setDisplayCart(false);
    setAddedProduct(null);
    setDisplayThankYou(true);

    setTimeout(() => {
      setDisplayThankYou(false);
    }, 700);
  };

  return (
    <>
      <header>
        <MenuWrap>
          <Menu onClick={handleOpenMenu} src={MenuIcon} />
          <Logo src={LogoIcon} />
          <DesktopNav>
            <ul className="desktop-ul">
              {navigation.map((category) => (
                <li
                  key={category}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveNav(category)}>
                  <Link
                    style={{
                      all: "unset",
                      fontSize: "1.5rem",
                      paddingBottom: "3.8rem",
                      color: activeNav === category ? "black" : "#69707D",
                      borderBottom:
                        activeNav === category ? "4px solid #FF7E1B" : "",
                    }}
                    to={category}>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </DesktopNav>
        </MenuWrap>

        <CartAndProfile>
          <CartDiv>
            {addedProduct && <CartQuantity>{quantity}</CartQuantity>}
            <Cart onClick={handleDisplayCart} src={CartIcon} />
          </CartDiv>
          <Avatar src={AvatarImg} />
        </CartAndProfile>
      </header>
      {displayMenu && (
        <MobileNav isClosing={isClosing}>
          <Close onClick={handleCloseMenu} src={CloseIcon} />
          <ul className="mobile-ul">
            {navigation.map((category) => (
              <li
                key={category}
                style={{ all: "unset" }}
                onClick={handleCloseMenu}>
                <Link style={{ all: "unset" }} to={category}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </MobileNav>
      )}

      {displayCart && (
        <CartSection>
          <CartTitleDiv>
            <h1>Cart</h1>
          </CartTitleDiv>

          <InnerCart>
            {addedProduct === null ? (
              <EmptySpan>Your cart is empty.</EmptySpan>
            ) : (
              <>
                <ProductInfo>
                  <CartImg src={ProductThumbnail} />
                  <ProductInfoText>
                    {addedProduct.offerTitle} ${addedProduct.price} x {quantity}{" "}
                    <span>${addedProduct.price * quantity}</span>
                  </ProductInfoText>
                  <button
                    onClick={() => setAddedProduct(null)}
                    style={{ all: "unset", cursor: "pointer" }}>
                    <img src="/images/icon-delete.svg" alt="" />
                  </button>
                </ProductInfo>
                <CheckoutButton onClick={handleCheckOut}>
                  Checkout
                </CheckoutButton>
              </>
            )}
          </InnerCart>
        </CartSection>
      )}
      {displayThankYou && <ThankYou>Thank you!</ThankYou>}
    </>
  );
}

// Styled Components

const Menu = styled.img`
  cursor: pointer;

  @media only screen and (min-width: 90rem) {
    display: none;
  }
`;

const DesktopNav = styled.nav`
  display: none;

  @media only screen and (min-width: 90rem) {
    display: block;
  }
`;

const Logo = styled.img``;

const MenuWrap = styled.div`
  display: flex;
  align-items: end;
  gap: 1.6rem;

  @media only screen and (min-width: 90rem) {
    gap: 5.6rem;
  }
`;

const CartAndProfile = styled.div`
  display: flex;
  gap: 2.2rem;
  align-items: end;

  @media only screen and (min-width: 90rem) {
    gap: 4.6rem;
    align-items: center;
  }
`;

const Cart = styled.img`
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 2.4rem;
  cursor: pointer;
  border: 3px solid transparent;
  border-radius: 50%;

  &:hover {
    border-color: #ff7e1b;
    transition: 0.2s;
  }

  @media only screen and (min-width: 90rem) {
    width: 5rem;
  }
`;

// Keyframes for Animations
const slideIn = keyframes`
  from {
    transform: translateX(-100%); 
  }
  to {
    transform: translateX(0); 
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0); 
  }
  to {
    transform: translateX(-100%); 
  }
`;

const MobileNav = styled.nav<{ isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 25rem;
  background-color: white;
  padding: 2.47rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5.3rem;
  z-index: 1000;
  box-shadow: 20px 0px 100000px #00000077;
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.3s
    ease-out;
`;

const Close = styled.img`
  cursor: pointer;
`;

const bubbleAnimation = keyframes`
  0% {
    transform: translateX(-50%) scale(0);
    opacity: 0;
  }
  30% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(0.9);
    opacity: 1;
  }
  80% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
`;

const bubbleAnimationThankYou = keyframes`
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

const CartSection = styled.section`
  position: fixed;
  background-color: white;
  border-radius: 0.7rem;
  z-index: 100;
  width: 95%;
  left: 50%;
  top: 7.6rem;
  transform: translateX(-50%);
  box-shadow: 0px 10px 15px #0000006f;
  animation: ${bubbleAnimation} 0.7s ease-in-out;
  max-width: 38rem;

  @media only screen and (min-width: 90rem) {
    right: 0.9rem;
    top: 9.4rem;
    left: unset;
  }
`;

const CartTitleDiv = styled.div`
  padding: 2.4rem;
  border-bottom: 1px solid #e4e9f2;
`;

const InnerCart = styled.div`
  min-height: 18rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.4rem;
  gap: 2.4rem;
`;

const EmptySpan = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: #69707d;
`;

const CartImg = styled.img`
  width: 5rem;
  border-radius: 0.5rem;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const ProductInfoText = styled.span`
  font-size: 1.6rem;
  color: #69707d;
  text-align: left;
  max-width: 21.3rem;

  span {
    color: black;
    font-weight: 700;
  }
`;

const CheckoutButton = styled.button`
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
  padding: 2.2rem;
  width: 100%;
  border-radius: 0.9rem;
  background-color: #ff7e1b;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ffab6a;
    transition: 0.2s;
  }
`;

const CartDiv = styled.div`
  position: relative;
`;

const CartQuantity = styled.span`
  background-color: #ff7e1b;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 50%;
  padding: 0.3rem 0.6rem;
  position: absolute;
  right: -0.6rem;
  top: -0.6rem;
`;

const ThankYou = styled.div`
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
  animation: ${bubbleAnimationThankYou} 0.7s ease-in-out;
  z-index: 1000;
  box-shadow: 0px 10px 15px #00000035;
  font-weight: 700;

  @media only screen and (min-width: 90rem) {
    max-width: 50rem;
    top: unset;
    bottom: 10%;
    font-size: 2.2rem;
  }
`;
