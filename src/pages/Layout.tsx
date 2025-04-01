import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { AddedProduct } from "../types";

export default function Layout() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(0);
  const [addedProduct, setAddedProduct] = useState<AddedProduct | null>(null);
  const [displayCart, setDisplayCart] = useState<boolean>(false);

  useEffect(() => {
    navigate("/MainPage");
  }, [navigate]);

  return (
    <div>
      <Header
        quantity={quantity}
        addedProduct={addedProduct}
        displayCart={displayCart}
        setDisplayCart={setDisplayCart}
        setAddedProduct={setAddedProduct}
      />
      <Outlet
        context={{
          quantity,
          setQuantity,
          addedProduct,
          setAddedProduct,
          displayCart,
          setDisplayCart,
        }}
      />{" "}
    </div>
  );
}
