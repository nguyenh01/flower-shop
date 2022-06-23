import { setCountCookie } from '@src/redux/slices/productSlice';
import dispatch from '@src/utils/dispatch';
import Cookies from 'js-cookie';

export interface Product {
  id?: string;
  image?: string;
  name?: string;
  price?: number;
  quantity?: number;
}

export const handleAddToCartWithCookie = (id?: string, product?: Product, quantity?: number) => {
  const cartCookie = Cookies.get('carts');
  if (cartCookie) {
    const parseJson = JSON.parse(cartCookie);
    const cartCopy = parseJson.slice();
    const index = cartCopy.findIndex((item: Product) => item.id === id);
    if (index === -1) {
      cartCopy.push(product);
    } else {
      const pr = cartCopy[index];
      cartCopy[index] = { ...pr, quantity: pr.quantity + quantity };
    }
    dispatch(setCountCookie(cartCopy.length));
    const jsonString = JSON.stringify(cartCopy);
    Cookies.set('carts', jsonString);
  } else {
    dispatch(setCountCookie([product].length));
    const jsonString = JSON.stringify([product]);
    Cookies.set('carts', jsonString);
  }
};

export const handleUpdateQuantity = (id: string, quantity: number) => {
  const cartCookie = Cookies.get('carts');
  if (cartCookie) {
    const parseJson = JSON.parse(cartCookie);
    const cartCopy = parseJson.slice();
    const index = cartCopy.findIndex((item: Product) => item.id === id);
    if (index === -1) {
      return;
    } else {
      const pr = cartCopy[index];
      cartCopy[index] = { ...pr, quantity: quantity };
    }
    dispatch(setCountCookie(cartCopy.length));
    const jsonString = JSON.stringify(cartCopy);
    Cookies.set('carts', jsonString);
  }
};

export const handleDeleteItemInCart = (newCart: Product[]) => {
  dispatch(setCountCookie(newCart.length));
  const jsonString = JSON.stringify(newCart);
  Cookies.set('carts', jsonString);
};

export const handleClearCart = () => {
  Cookies.set('carts', '[]');
  const cartCookie = Cookies.get('carts');
  const parseJson = JSON.parse(cartCookie || '[]');
  dispatch(setCountCookie(parseJson.length));
};
