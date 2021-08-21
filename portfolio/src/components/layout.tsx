import React from 'react';
import 'modern-css-reset';
import { css } from '@emotion/react';
import { Header } from './header';
import { MobileNav } from './mobile-nav';
import { useMediaQuery } from 'react-responsive';
import { moblie } from '../styles/media-query';
import backgroundImage from '../images/bruno_bg.jpg';
import '../styles/global.css';

const main = css`
  width: 100%;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

const mainContainer = css`
  width: 100%;
  position: relative;
  flex: 1;
`;

const mainContainerMobile = css`
  ${mainContainer}
  padding-bottom: 60px;
`;

export const Layout: React.FC<{ pathname: string }> = ({
  children,
  pathname,
}) => {
  const isMobile = useMediaQuery(moblie);
  const mainContainerCss = isMobile ? mainContainerMobile : mainContainer;

  return (
    <>
      <div css={main}>
        <Header pathname={pathname} />
        <div css={mainContainerCss}>{children}</div>
        {isMobile && <MobileNav />}
      </div>
    </>
  );
};
