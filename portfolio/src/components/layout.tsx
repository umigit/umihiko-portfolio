import React from 'react';
import 'modern-css-reset';
import { Header } from './header';
import { css } from '@emotion/react';
import backgroundImage from '../images/bruno_bg.jpg';
import '../styles/global.css';

const main = css`
  width: 100%;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  overflow: scroll;
`;

const mainContainer = css`
  width: 100%;
  height: calc(100vh - 80px);
`;

export const Layout: React.FC<{ pathname: string }> = ({
  children,
  pathname,
}) => {
  return (
    <>
      <div css={main}>
        <Header pathname={pathname} />
        <div css={mainContainer}>{children}</div>
      </div>
    </>
  );
};
