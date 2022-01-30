import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import { colors } from '../styles/colors';
import { SitePageContext } from '../../types/graphql-types';

const pagination = css`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const navigation = css`
  width: 100px;
  font-size: 1.25rem;

  a {
    color: ${colors.white};
    text-decoration: none;
  }
`;
const previous = css`
  margin-right: 1rem;
  text-align: right;
`;

const next = css`
  margin-left: 1rem;
  text-align: left;
`;

const pageContainer = css`
  display: flex;
  align-items: flex-end;
`;

const page = css`
  padding: 0rem 0.5rem;
  font-size: 1.25rem;
  text-align: center;

  a {
    color: ${colors.white};
    text-decoration: none;
  }
`;

const current = css`
  width: 1.5rem;
  font-size: 1.5rem;
  border-bottom: solid 2px ${colors.white};
`;

const pageButton = css``;

type Props = { pageContext: SitePageContext };

export const Pagination: React.FC<Props> = ({ pageContext }) => {
  const currentPage = pageContext.currentPage;
  const prefix = pageContext.prefix;
  if (!currentPage) {
    return <div></div>;
  }

  const previousPagePath =
    prefix + (currentPage > 2 ? `/${currentPage - 1}` : ``);
  const nextPagePath = `${prefix}/${currentPage + 1}`;

  return (
    <div css={pagination}>
      <div css={[navigation, previous]}>
        {pageContext.hasPreviousPage && (
          <Link to={previousPagePath}>Previous</Link>
        )}
      </div>

      <div css={pageContainer}>
        {[...Array(pageContext.numberOfPages)].map((_, i) => (
          <div css={page}>
            <Link to={prefix + (i > 0 ? `/${i + 1}` : ``)}>
              <div css={currentPage === i + 1 ? current : pageButton}>
                {i + 1}
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div css={[navigation, next]}>
        {pageContext.hasNextPage && <Link to={nextPagePath}>Next</Link>}
      </div>
    </div>
  );
};
