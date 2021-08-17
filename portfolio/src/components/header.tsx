import React from 'react';
import { css } from '@emotion/react';
import { colors } from '../styles/colors';
import { HomeButton } from './home-button';
import { HeaderNav } from './header-nav';

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

const home = css`
  position: absolute;
  top: 0;
  left: 0;
`;

const nav = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Header: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <header>
      <div css={wrapper}>
        {pathname !== '/' && (
          <div css={home}>
            <HomeButton />
          </div>
        )}
        <div css={nav}>
          <HeaderNav />
        </div>
      </div>
    </header>
  );
};
