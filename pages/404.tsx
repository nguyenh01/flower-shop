import { Fragment, ReactElement } from 'react';
import EmptyLayout from '@src/components/Layout/EmptyLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Path from '@src/utils/path';

function PageNotFound() {
  const router = useRouter();
  const redirectHomePage = () => router.push(Path.HOME);

  return (
    <Fragment>
      <Head>
        <title>Flower Sun - Page Not Found</title>
      </Head>
      <h1>404</h1>
      <h2>OPPS! PAGE NOT BE FOUND</h2>
      <h4>Sorry, But the page you are looking for does not exist!</h4>
      <button onClick={redirectHomePage}>Go to home page</button>
    </Fragment>
  );
}

PageNotFound.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export default PageNotFound;
