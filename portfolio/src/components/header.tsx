import React from 'react';
import { css } from '@emotion/react';
import { colors } from '../styles/colors';
import { HomeButton } from './home-button';
import { HeaderNav } from './header-nav';
import { useMediaQuery } from 'react-responsive';
import { moblie, tablet } from '../styles/media-query';

const wrapper = css`
  width: 100%;
  height: 80px;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  color: ${colors.white};
  z-index: 100;
  position: relative;
`;

const wrapperMobile = css`
  ${wrapper}
  height: 60px;
`;

const home = css`
  position: absolute;
  top: 20px;
  left: 0;
`;

const homeMobile = css`
  ${home}
  top: 0;
`;

const nav = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Header: React.FC<{ pathname: string }> = ({ pathname }) => {
  const isMobile = useMediaQuery(moblie);
  const wrapperCss = isMobile ? wrapperMobile : wrapper;
  const homeCss = isMobile ? homeMobile : home;

  return (
    <header>
      <div css={wrapperCss}>
        {pathname !== '/' && (
          <div css={homeCss}>
            <HomeButton css={{ height: '80px' }} />
          </div>
        )}
        {!isMobile && (
          <div css={nav}>
            <HeaderNav />
          </div>
        )}
      </div>
    </header>
  );
};
