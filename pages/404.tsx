import { Fragment, ReactElement } from 'react';
import EmptyLayout from '@src/components/Layout/EmptyLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Wrapper from '@src/components/Layout/Wrapper';
import { Image } from 'antd';
import Button from '@src/components/Button/Button';
import { IoChevronBack } from 'react-icons/io5';

function PageNotFound() {
  const router = useRouter();
  const redirectPreviousPage = () => router.back();

  return (
    <Fragment>
      <Head>
        <title>Flower Sun - Page Not Found</title>
      </Head>
      <Container>
        <Wrapper className="wrapper">
          <div className="mb-50">
            <Image src="/images/404-page.svg" width={850} alt="img" preview={false} />
          </div>
          <div className="title mb-25">Page Not Found</div>
          <div className="content mb-25">
            Oops! Looks like you followed a bad link. If you think this is a problem with us, please
            tell us.
          </div>
          <Button className="back-btn" type="default" onClick={redirectPreviousPage}>
            <IoChevronBack className="back-icon" /> Go back
          </Button>
        </Wrapper>
      </Container>
    </Fragment>
  );
}

const Container = styled.div`
  ${(props) => props.theme.displayFlex('center', 'center')};
  background-color: #f2f4f6;
  height: 100vh;

  .wrapper {
    ${(props) => props.theme.displayFlex('center', 'center')};
    flex-direction: column;

    .title {
      ${(props) => props.theme.fontCustom(40, 500, 50)};
    }

    .content {
      ${(props) => props.theme.fontCustom(20, 300, 32)};
    }

    .back-btn {
      background-color: #000;
      border-radius: 8px;
      text-transform: unset;
      font-weight: 500;

      .back-icon {
        margin-right: 15px;
        width: 20px;
        height: 20px;
        fill: #fff;

        path {
          stroke-width: 70px;
        }
      }
    }
  }
`;

PageNotFound.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export default PageNotFound;
