export interface IProduct {
  companyName: string;
  color: string;
  offerTitle: string;
  textContent: string;
  price: number;
  discount: number;
  oldPrice: number;
}

export interface MainPageProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export type AddedProduct = {
  offerTitle: string;
  price: number;
} | null;

export interface HeaderProps {
  quantity: number;
  addedProduct: AddedProduct;
  displayCart: boolean;
  setDisplayCart: React.Dispatch<React.SetStateAction<boolean>>;
  setAddedProduct: React.Dispatch<React.SetStateAction<AddedProduct | null>>;
}
