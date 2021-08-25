import React from 'react';
import { css } from '@emotion/react';

import { StaticImage } from 'gatsby-plugin-image';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

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
      <OutboundLink href='https://github.com/umigit' target='_blank'>
        <StaticImage
          css={icon}
          height={60}
          src='../images/github.png'
          alt='github'
        />
      </OutboundLink>
      <OutboundLink
        href='https://www.wantedly.com/id/umihiko_amanuma'
        target='_blank'
      >
        <StaticImage
          css={icon}
          height={60}
          src='../images/wantedly.png'
          alt='wantedly'
        />
      </OutboundLink>
    </div>
  );
};
