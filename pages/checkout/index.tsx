import { Fragment, ReactElement, useMemo } from 'react';
import EmptyLayout from '@src/components/Layout/EmptyLayout';
import Head from 'next/head';
import Checkout from '@src/containers/Checkout';
import axios from 'axios';
import host from '@src/api/host';
import Path from '@src/utils/path';
import { redirect } from '@src/utils/redirect';
import { GetServerSidePropsContext } from 'next';
import useAuthentication from '@src/hooks/useAuthentication';

function CheckoutPage({ data }: any) {
  useAuthentication();
  const cart = useMemo(() => data, [data]);

  return (
    <Fragment>
      <Head>
        <title>Flower Sun - Checkout</title>
      </Head>
      <Checkout cart={cart} />
    </Fragment>
  );
}

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export const getServerSideProps = async (server: GetServerSidePropsContext) => {
  const { resolvedUrl, req } = server;
  const token = server?.req?.cookies?.token;
  const cartCookies = server?.req?.cookies?.carts;

  try {
    if (!token) {
      const parseJson = JSON.parse(cartCookies);
      if (parseJson.length === 0 || !cartCookies) {
        redirect(server, Path.CART);
        return { query: server.query };
      } else {
        const formatCart = parseJson.map((item: any) => ({
          product_id: item?.id,
          quantity: item?.quantity,
          product_name: item?.name,
          imageList: [item?.image],
          unit_price: item?.price,
        }));
        return { props: { data: { shoppingCart: {}, listShoppingCartDetail: formatCart } } };
      }
    }
    if (req && token) {
      const response = await axios.get(`${host}/shoppingCarts`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const checkCartItem = response?.data?.listShoppingCartDetail.length === 0;
      if (checkCartItem && resolvedUrl === Path.CHECK_OUT) {
        redirect(server, Path.CART);
        return { query: server.query };
      }
      return { props: { data: response?.data } };
    }
  } catch (error) {
    return { props: { data: 'error' } };
  }
};

export default CheckoutPage;
