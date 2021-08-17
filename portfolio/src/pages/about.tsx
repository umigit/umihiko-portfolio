import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { css } from '@emotion/react';
import { StaticImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';
import { colors } from '../styles/colors';
import { Accounts } from '../components/accounts';
import { GetProfileQuery, SitePageContext } from '../../types/graphql-types';

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

const image = css`
  flex: 1;
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

const accounts = css`
  margin-top: 10px;
`;

export type Props = PageProps<GetProfileQuery, SitePageContext>;

const AboutPage: React.FC<Props> = ({ data, location }) => {
  const user = data.portfolio ? data.portfolio.user : null;

  return (
    <Layout pathname={location.pathname}>
      <div css={container}>
        {user && (
          <div css={panel}>
            <StaticImage
              css={image}
              src='../images/profile.jpg'
              alt='profile'
            />
            <div css={text}>
              <h2>{user.profiles.find((p) => p.locale === 'ja')?.nickname}</h2>
              <p>{user.profiles.find((p) => p.locale === 'ja')?.summary}</p>
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
      user(id: 2) {
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
