import React from 'react';
import { css } from '@emotion/react';
import { colors } from '../styles/colors';
import { HomeButton } from './home-button';
import { HeaderNav } from './header-nav';
import { useMediaQuery } from 'react-responsive';
import { mobile, tablet, PC } from '../styles/media-query';

const wrapper = css`
  width: 100%;
  height: 80px;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  color: ${colors.white};
  z-index: 100;
  position: relative;

  @media ${mobile} {
    height: 60px;
  }
`;

const home = css`
  position: absolute;
  top: 20px;
  left: 0;

  @media ${mobile} {
    top: 0;
  }
`;

const nav = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Header: React.FC<{ pathname: string }> = ({ pathname }) => {
  const isTablet = useMediaQuery({ query: tablet });
  const isPC = useMediaQuery({ query: PC });

  return (
    <header>
      <div css={wrapper}>
        {pathname !== '/' && (
          <div css={home}>
            <HomeButton css={{ height: '80px' }} />
          </div>
        )}
        {(isTablet || isPC) && (
          <div css={nav}>
            <HeaderNav />
          </div>
        )}
      </div>
    </header>
  );
};
