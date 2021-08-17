import React from 'react';
import { PageProps } from 'gatsby';
import { css } from '@emotion/react';
import { StaticImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const image = css`
  transform: translateY(-60px);
`;

const IndexPage: React.FC<PageProps> = ({ location }) => {
  return (
    <Layout pathname={location.pathname}>
      <div css={container}>
        <div css={image}>
          <StaticImage src='../images/umihiko_logo.png' alt='logo' />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
