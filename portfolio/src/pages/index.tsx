import React from 'react';
import { PageProps, Link } from 'gatsby';
import { css } from '@emotion/react';
import { StaticImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
import { mobile } from '../styles/media-query';

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

  @media ${mobile} {
    transform: translateY(0);
  }
`;

const IndexPage: React.FC<PageProps> = ({ location }) => {
  return (
    <>
      <SEO pathname={location.pathname} top={true} />
      <Layout pathname={location.pathname}>
        <div css={container}>
          <div css={image}>
            <Link to='/about/'>
              <StaticImage src='../images/umihiko_logo.png' alt='logo' />
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
