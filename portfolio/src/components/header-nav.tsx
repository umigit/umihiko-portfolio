import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { colors } from '../styles/colors';

const navLink = css`
  height: 60px;
  margin-top: 20px;
  text-align: center;
  line-height: 75px;
  display: flex;
  a {
    color: ${colors.white};
    font-size: 24px;
    text-decoration: none;
  }
`;

const link = css`
  width: 100px;
  height: 100%;
`;

export const HeaderNav: React.FC = () => {
  return (
    <div css={navLink}>
      <Link to='/about/'>
        <div css={link}>About</div>
      </Link>
      <Link to='/blog/'>
        <div css={link}>Blog</div>
      </Link>
    </div>
  );
};
