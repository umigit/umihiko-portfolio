import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const logo = css`
  margin-top: 20px;
  margin-left: 20px;
  height: 60px;
`;

export const HomeButton: React.FC = () => {
  return (
    <Link to='/'>
      <StaticImage
        css={logo}
        height={60}
        src='../images/umihiko_logo.png'
        alt='logo'
      />
    </Link>
  );
};
