import { Fragment, ReactElement, useEffect } from 'react';
import EmptyLayout from '@src/components/Layout/EmptyLayout';
import Head from 'next/head';
import Checkout from '@src/containers/Checkout';
import useSelector from '@src/utils/useSelector';
import { useRouter } from 'next/router';

function CheckoutPage() {
  const router = useRouter();
  const { cart } = useSelector((state) => state.productSilce);

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/');
    }
  }, [cart]);

  return (
    <Fragment>
      <Head>
        <title>Flower Sun - Checkout</title>
      </Head>
      <Checkout />
    </Fragment>
  );
}

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export default CheckoutPage;
