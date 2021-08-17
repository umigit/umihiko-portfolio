import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const iconList = css`
  a {
    margin-right: 10px;
  }
`;
const icon = css`
  width: 32px;
  height: 32px;
`;

export const Accounts: React.FC = () => {
  return (
    <div css={iconList}>
      <a href='https://github.com/umigit' target='_blank'>
        <StaticImage
          css={icon}
          height={60}
          src='../images/github.png'
          alt='github'
        />
      </a>
      <a href='https://www.wantedly.com/id/umihiko_amanuma' target='_blank'>
        <StaticImage
          css={icon}
          height={60}
          src='../images/wantedly.png'
          alt='wantedly'
        />
      </a>
    </div>
  );
};
