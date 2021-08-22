import React from 'react';
import { css } from '@emotion/react';
import { MobilePagination } from './mobile-pagination';
import { Breadcrumb } from './breadcrumb';
import { SitePageContext } from '../../types/graphql-types';

const breadcrumbContainer = css`
  width: 100%;
  max-width: 1280px;
  padding: 0px 30px;
  margin: 0 auto;
`;

const blogPanelContainer = css`
  width: 100%;
  max-width: 1280px;
  padding: 0px 10px 67px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

const paginationContainer = css`
  padding: 15px 0px 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60px;
`;
type Props = { pageContext: SitePageContext };

export const MobileBlogListLayout: React.FC<Props> = ({
  children,
  pageContext,
}) => {
  return (
    <div>
      <div css={breadcrumbContainer}>
        <Breadcrumb pageContext={pageContext} />
      </div>
      <div css={blogPanelContainer}>{children}</div>
      <div css={paginationContainer}>
        <MobilePagination pageContext={pageContext} />
      </div>
    </div>
  );
};

export default MobileBlogListLayout;
