import React from 'react';
import { PageProps, Link } from 'gatsby';
import { css } from '@emotion/react';
import { StaticImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
import { useMediaQuery } from 'react-responsive';
import { mobile, tablet, PC } from '../styles/media-query';

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
  const isMobile = useMediaQuery({ query: mobile });
  const isTablet = useMediaQuery({ query: tablet });
  const isPC = useMediaQuery({ query: PC });

  return (
    <>
      <SEO pathname={location.pathname} top={true} />
      <Layout pathname={location.pathname}>
        <div css={container}>
          {isMobile && (
            <div css={imageMobile}>
              <Link to='/about/'>
                <StaticImage src='../images/umihiko_logo.png' alt='logo' />
              </Link>
            </div>
          )}
          {(isTablet || isPC) && (
            <div css={image}>
              <Link to='/about/'>
                <StaticImage src='../images/umihiko_logo.png' alt='logo' />
              </Link>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
