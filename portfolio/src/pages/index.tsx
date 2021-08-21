import React from 'react';
import { PageProps } from 'gatsby';
import { css } from '@emotion/react';
import { StaticImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';
import { useMediaQuery } from 'react-responsive';
import { moblie } from '../styles/media-query';

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const image = css`
  transform: translateY(-60px);
`;

const imageMobile = css`
  transform: translateY(0);
`;

const IndexPage: React.FC<PageProps> = ({ location }) => {
  const isMobile = useMediaQuery(moblie);

  return (
    <Layout pathname={location.pathname}>
      <div css={container}>
        {isMobile ? (
          <div css={imageMobile}>
            <StaticImage src='../images/umihiko_logo.png' alt='logo' />
          </div>
        ) : (
          <div css={image}>
            <StaticImage src='../images/umihiko_logo.png' alt='logo' />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IndexPage;
