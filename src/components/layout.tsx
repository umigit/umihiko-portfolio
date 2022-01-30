import React from 'react';
import 'modern-css-reset';
import { css } from '@emotion/react';
import { StaticImage } from 'gatsby-plugin-image';
import { use100vh } from 'react-div-100vh';
import { Header } from './header';
import { MobileNav } from './mobile-nav';
import { useMediaQuery } from 'react-responsive';
import { moblie, tablet, PC } from '../styles/media-query';
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
  display: flex;
  flex-direction: column;
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
  const isTablet = useMediaQuery(tablet);
  const isPC = useMediaQuery(PC);
  const minHeight = use100vh() || '100vh';

  return (
    <>
      <div css={main} style={{ minHeight: minHeight }}>
        <StaticImage
          css={image}
          src='../images/bruno_bg.jpg'
          alt='background'
        />

        <Header pathname={pathname} />
        {isMobile && <div css={mainContainerMobile}>{children}</div>}
        {(isTablet || isPC) && <div css={mainContainer}>{children}</div>}
        {isMobile && <MobileNav />}
      </div>
    </>
  );
};
