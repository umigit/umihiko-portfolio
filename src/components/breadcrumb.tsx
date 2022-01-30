import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import { colors } from '../styles/colors';
import { SitePageContext } from '../../types/graphql-types';

const breadcrumb = css`
  color: ${colors.white};
  a {
    color: ${colors.orange};
    text-decoration: none;
  }
`;

const top = css`
  padding-left: 0.5rem;
`;

const child = css`
  position: relative;
  padding-left: 2rem;

  :before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    left: 0.5rem;
    top: calc(50% - 1px);
    border-top: solid 2px;
    border-right: solid 2px;
    transform: rotate(45deg) translateY(-50%);
  }
`;

type Props = { pageContext: SitePageContext };

export const Breadcrumb: React.FC<Props> = ({ pageContext }) => {
  const category = pageContext.category;
  const title = pageContext.title;
  const isEntry = !!title;
  const isCategory = !!category && !isEntry;
  const isTop = !isCategory && !isEntry;

  if (isTop) {
    return <></>;
  }

  const categoryLink = isCategory ? (
    <span css={child}>{category}</span>
  ) : (
    <span css={child}>
      <Link to={`/blog/category/${category}`}>{category}</Link>
    </span>
  );

  const entryLink = isEntry ? <span css={child}>{title}</span> : null;

  return (
    <div css={breadcrumb}>
      <span css={top}>
        <Link to='/blog'>TOP</Link>
      </span>
      {categoryLink}
      {entryLink}
    </div>
  );
};
