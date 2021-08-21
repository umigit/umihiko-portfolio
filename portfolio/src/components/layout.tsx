import React from 'react';
import 'modern-css-reset';
import { css } from '@emotion/react';
import { StaticImage } from 'gatsby-plugin-image';
import { Header } from './header';
import { MobileNav } from './mobile-nav';
import { useMediaQuery } from 'react-responsive';
import { moblie } from '../styles/media-query';
import '../styles/global.css';

const main = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const image = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
`;

const mainContainer = css`
  width: 100%;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
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
        <StaticImage
          css={image}
          src='../images/bruno_bg.jpg'
          alt='background'
        />
        <Header pathname={pathname} />
        <div css={mainContainerCss}>{children}</div>
        {isMobile && <MobileNav />}
      </div>
    </>
  );
};
