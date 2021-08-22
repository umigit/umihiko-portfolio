import React from 'react';
import { PageProps } from 'gatsby';
import { css } from '@emotion/react';
import { Pagination } from '../components/pagination';
import { Breadcrumb } from '../components/breadcrumb';
import { GetBlogPostsQuery, SitePageContext } from '../../types/graphql-types';

const breadcrumbContainer = css`
  width: 100%;
  max-width: 1280px;
  padding: 0px 30px;
  margin: 0 auto;
`;

const blogPanelContainer = css`
  width: 100%;
  max-width: 1280px;
  padding: 0px 15px 113px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

const paginationContainer = css`
  padding: 30px 0px 45px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

type Props = { pageContext: SitePageContext };

export const BlogListLayout: React.FC<Props> = ({ children, pageContext }) => {
  return (
    <div>
      <div css={breadcrumbContainer}>
        <Breadcrumb pageContext={pageContext} />
      </div>
      <div css={blogPanelContainer}>{children}</div>
      <div css={paginationContainer}>
        <Pagination pageContext={pageContext} />
      </div>
    </div>
  );
};

export default BlogListLayout;
