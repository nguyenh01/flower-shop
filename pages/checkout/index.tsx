import { Fragment, ReactElement, useMemo } from 'react';
import EmptyLayout from '@src/components/Layout/EmptyLayout';
import Head from 'next/head';
import Checkout from '@src/containers/Checkout';
import axios from 'axios';
import apiHost from '@src/api/api-host';
import Path from '@src/utils/path';
import { GetServerSidePropsContext } from 'next';
import useAuthentication from '@src/hooks/useAuthentication';

const CheckoutPage = ({ data }: any) => {
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
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export const getServerSideProps = async (server: GetServerSidePropsContext) => {
  const { resolvedUrl, req } = server;
  const token = await req?.cookies?.token;
  const cartCookies = req?.cookies?.carts;

  if (!token) {
    const parseJson = JSON.parse(cartCookies as any);
    if (parseJson.length === 0) {
      return {
        redirect: {
          permanent: false,
          destination: Path.CART,
        },
      };
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
  if (token) {
    const response = await axios.get(`${apiHost}/shoppingCarts`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const checkCartItem = response?.data?.listShoppingCartDetail.length === 0;
    if (checkCartItem && resolvedUrl === Path.CHECK_OUT) {
      return {
        redirect: {
          permanent: false,
          destination: Path.CART,
        },
      };
    }
    return { props: { data: response?.data } };
  }
};

export default CheckoutPage;
