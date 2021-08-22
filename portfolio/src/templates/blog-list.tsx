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
      <p
        css={css`
          color: white;
        `}
      >
        {isMobile ? 'mobile' : 'no mobile'}
      </p>
      {isMobile && (
        <MobileBlogListLayout pageContext={pageContext}>
          {blogPostPanels}
        </MobileBlogListLayout>
      )}
      {!isMobile && (
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
