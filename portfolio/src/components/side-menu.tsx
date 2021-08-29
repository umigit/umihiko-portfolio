import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import { colors } from '../styles/colors';
import { SitePageContext } from '../../types/graphql-types';

const sideMenu = css`
  width: 100%;
  height: 100%;
`;

const panel = css`
  width: 100%;
  padding: 1rem;
  color: ${colors.white};
  background-color: ${colors.alphaBlack};

  a {
    color: ${colors.orange};
    text-decoration: none;
  }

  h2 {
    padding: 0rem 0.5rem;
    margin: 0.75rem 0;
    border-left: 0.25rem solid ${colors.orange};
  }
`;

const categoryLink = css`
  padding-left: 1rem;
  margin: 0.5rem 0;
`;

type Props = {
  pageContext: SitePageContext;
};

export const SideMenu: React.FC<Props> = ({ pageContext }) => {
  const categories = pageContext.categories;

  return (
    <div css={sideMenu}>
      <div css={panel}>
        {categories && (
          <div>
            <h2>Categories</h2>

            {categories.map((category, i) => (
              <div css={categoryLink} key={i}>
                <Link to={`/blog/category/${category}/`}>{category}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
