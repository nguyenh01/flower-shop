import Path from '@src/utils/path';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { BsFlower1 } from 'react-icons/bs';
import styled from 'styled-components';

interface LogoProps {
  logoSize?: number;
  fontSize?: number;
}

const Logo: FunctionComponent<LogoProps> = ({ logoSize, fontSize }) => {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push(Path.HOME);
  };

  return (
    <Container logoSize={logoSize} fontSize={fontSize} onClick={handleGoToHome}>
      <BsFlower1 className="logo-container" />
      <span className="logo-name">
        Flower <span className="extend">Sun</span>
      </span>
    </Container>
  );
};

const Container = styled.div<LogoProps>`
  display: flex;
  align-items: center;
  cursor: pointer;

  .logo-container {
    width: ${({ logoSize }) => (logoSize ? `${logoSize}px` : '60px')};
    height: ${({ logoSize }) => (logoSize ? `${logoSize}px` : '60px')};
    fill: ${({ theme }) => theme.colors.primary};
    margin-right: 16px;
    animation: rotating 20s linear infinite;
  }

  .logo-name {
    display: flex;
    font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '30px')};
    font-weight: 700;

    .extend {
      margin-left: 5px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Logo;
