import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { css } from '@emotion/react';
import { StaticImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
import { colors } from '../styles/colors';
import { Accounts } from '../components/accounts';
import { GetProfileQuery, SitePageContext } from '../../types/graphql-types';
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

const panelContainer = css`
  padding: 15px 30px;
  transform: translateY(-40px);

  @media ${mobile} {
    padding: 15px 10px;
  }
`;

const panel = css`
  width: 700px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background-color: rgba(0, 0, 0, 0.6);
  color: ${colors.white};
  display: flex;

  @media ${mobile} {
    width: 100%;
    display: block;
  }
`;

const image = css`
  flex: 1;
`;

const imageMobile = css`
  float: left;
  margin-right: 1rem;
`;

const text = css`
  width: 450px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  p {
    white-space: pre-wrap;
    word-wrap: break-word;
    flex: 1;
  }

  @media ${mobile} {
    width: 100%;

    h2 {
      margin-bottom: 0.25rem;
    }
  }
`;

const accounts = css`
  margin-top: 10px;
`;

export type Props = PageProps<GetProfileQuery, SitePageContext>;

const AboutPage: React.FC<Props> = ({ data, location }) => {
  const user = data.portfolio.user;
  const isMobile = useMediaQuery({ query: mobile });
  const isTablet = useMediaQuery({ query: tablet });
  const isPC = useMediaQuery({ query: PC });
  const profile = user!.profiles.find((p) => p.locale === 'ja');

  if (!profile) {
    return <Layout pathname={location.pathname}></Layout>;
  }

  return (
    <>
      <SEO pathname={location.pathname} description={profile.summary} />
      <Layout pathname={location.pathname}>
        <div css={container}>
          <div css={panelContainer}>
            <div css={panel}>
              {(isTablet || isPC) && (
                <StaticImage
                  css={image}
                  src='../images/profile.jpg'
                  alt='profile'
                />
              )}
              <div css={text}>
                <p>
                  {isMobile && (
                    <StaticImage
                      css={imageMobile}
                      height={100}
                      src='../images/profile.jpg'
                      alt='profile'
                    />
                  )}
                  <h2>{profile.nickname}</h2>
                  {profile.summary}
                </p>
                <div css={accounts}>
                  <Accounts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const query = graphql`
  query GetProfile {
    portfolio {
      user(username: "umihiko") {
        username
        email
        profiles {
          nickname
          summary
          introduction
          locale
        }
      }
    }
  }
`;

export default AboutPage;
