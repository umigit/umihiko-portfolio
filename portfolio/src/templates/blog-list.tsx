import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { css } from '@emotion/react';
import { Layout } from '../components/layout';
import { BlogPostPanel } from '../components/blog-post-panel';
import { Pagination } from '../components/pagination';
import { MobilePagination } from '../components/mobile-pagination';
import { Breadcrumb } from '../components/breadcrumb';
import { BlogListLayout } from '../components/blog-list-layout';
import { MobileBlogListLayout } from '../components/mobile-blog-list-layout';
import { useMediaQuery } from 'react-responsive';
import { moblie } from '../styles/media-query';
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

const blogPanelContainerMobile = css`
  ${blogPanelContainer}
  padding: 0px 10px 67px;
`;

const paginationContainer = css`
  padding: 30px 0px 45px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const paginationContainerMobile = css`
  padding: 15px 0px 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60px;
`;

export type Props = PageProps<GetBlogPostsQuery, SitePageContext>;

const BlogPage: React.FC<Props> = ({ data, location, pageContext }) => {
  const blogPosts = data.portfolio.blogPosts?.edges;
  const currentPage = pageContext.currentPage;
  const isMobile = useMediaQuery(moblie);

  if (!blogPosts || !currentPage) {
    return (
      <Layout pathname={location.pathname}>
        <p>Sorry! Something wrong this page. Try again later.</p>
      </Layout>
    );
  }

  const blogPostPanels = blogPosts.map(
    (edge) =>
      edge &&
      edge.node && <BlogPostPanel post={edge.node} key={edge.node.slug} />
  );

  return (
    <Layout pathname={location.pathname}>
      {isMobile ? (
        <MobileBlogListLayout pageContext={pageContext}>
          {blogPostPanels}
        </MobileBlogListLayout>
      ) : (
        <BlogListLayout pageContext={pageContext}>
          {blogPostPanels}
        </BlogListLayout>
      )}
    </Layout>
  );
};

export const pageQuery = graphql`
  query GetBlogPosts($first: Int!, $after: String, $category: String) {
    portfolio {
      blogPosts(first: $first, after: $after, category: $category) {
        edges {
          node {
            slug
            title
            introduction
            publishedAt
            category
            image {
              url
              title
            }
          }
        }
      }
    }
  }
`;

export default BlogPage;
