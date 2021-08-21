import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { css } from '@emotion/react';
import { StaticImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';
import { colors } from '../styles/colors';
import { Accounts } from '../components/accounts';
import { GetProfileQuery, SitePageContext } from '../../types/graphql-types';
import { useMediaQuery } from 'react-responsive';
import { moblie, tablet } from '../styles/media-query';

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const panel = css`
  width: 700px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background-color: rgba(0, 0, 0, 0.6);
  color: ${colors.white};
  display: flex;
`;

const panelMobile = css`
  ${panel}
  width: 100%;
  margin: 0 10px;
  display: block;
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
`;

const textMobile = css`
  ${text}
  width: 100%;

  h2 {
    margin-bottom: 0.25rem;
  }
`;

const accounts = css`
  margin-top: 10px;
`;

export type Props = PageProps<GetProfileQuery, SitePageContext>;

const AboutPage: React.FC<Props> = ({ data, location }) => {
  const user = data.portfolio.user;
  const isMobile = useMediaQuery(moblie);
  const panelCss = isMobile ? panelMobile : panel;
  const textCss = isMobile ? textMobile : text;

  if (!user) {
    return <></>;
  }

  return (
    <Layout pathname={location.pathname}>
      <div css={container}>
        {user && (
          <div css={panelCss}>
            {!isMobile && (
              <StaticImage
                css={image}
                src='../images/profile.jpg'
                alt='profile'
              />
            )}
            <div css={textCss}>
              <p>
                {isMobile && (
                  <StaticImage
                    css={imageMobile}
                    height={100}
                    src='../images/profile.jpg'
                    alt='profile'
                  />
                )}
                <h2>
                  {user.profiles.find((p) => p.locale === 'ja')?.nickname}
                </h2>
                {user.profiles.find((p) => p.locale === 'ja')?.summary}
              </p>
              <div css={accounts}>
                <Accounts />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
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
