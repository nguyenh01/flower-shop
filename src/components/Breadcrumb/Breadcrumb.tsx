import React, { Fragment, FunctionComponent } from 'react';
import styled from 'styled-components';
import breadcrumb from '@public/images/breadcrumb.png';
import { Breadcrumb as BreadcrumbAntd } from 'antd';

interface BreadcrumbProps {
  breadcrumbTitle: string;
  breadcrumbItems: {
    name: string;
    link: string | undefined;
  }[];
}

const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({ breadcrumbTitle, breadcrumbItems }) => {
  const background: React.CSSProperties = {
    backgroundImage: `url('${breadcrumb.src}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '273px',
  };

  return (
    <Container>
      <div className="breadcrumb" style={background}>
        <div className="content">
          <div className="breadcrumb-title mb-15">{breadcrumbTitle}</div>
          <BreadcrumbAntd separator=">">
            {breadcrumbItems.map((item) =>
              item.link ? (
                <Fragment key={item.name}>
                  <BreadcrumbAntd.Item href={item.link}>{item.name}</BreadcrumbAntd.Item>
                </Fragment>
              ) : (
                <Fragment key={item.name}>
                  <BreadcrumbAntd.Item>{item.name}</BreadcrumbAntd.Item>
                </Fragment>
              )
            )}
          </BreadcrumbAntd>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 94px;

  .breadcrumb {
    ${(props) => props.theme.displayFlex('center', 'center')};

    .content {
      flex-direction: column;
      ${(props) => props.theme.displayFlex('center', 'center')};

      .breadcrumb-title {
        ${(props) => props.theme.fontCustom(30, 700, 30, 'Great Vibes,cursive')};
        text-transform: capitalize;
      }

      .ant-breadcrumb {
        li:hover a {
          color: ${(props) => props.theme.colors.primary};
        }

        a {
          color: #000;
          ${(props) => props.theme.fontCustom(18, 400, 18)};
          transition: color 0.3s;
          text-transform: uppercase;
        }

        span {
          color: #000;
          ${(props) => props.theme.fontCustom(14, 400, 14)};
          text-transform: capitalize;
        }

        .ant-breadcrumb-separator {
          ${(props) => props.theme.fontCustom(18, 400, 18)};
          color: #000;
        }
      }
    }
  }
`;

export default Breadcrumb;
