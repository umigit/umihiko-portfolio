import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import { css } from '@emotion/react';
import { Layout } from '../components/layout';
import { BlogPostPanel } from '../components/blog-post-panel';
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
  padding: 0px 15px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

const paginationContainer = css`
  padding: 30px 0px 45px;
`;

export type Props = PageProps<GetBlogPostsQuery, SitePageContext>;

const BlogPage: React.FC<Props> = ({ data, location, pageContext }) => {
  const blogPosts = data.portfolio.blogPosts?.edges;
  const currentPage = pageContext.currentPage;

  if (!blogPosts || !currentPage) {
    return (
      <Layout pathname={location.pathname}>
        <h1>Sorry! Something wrong this page. Try again later.</h1>
      </Layout>
    );
  }

  return (
    <Layout pathname={location.pathname}>
      <div css={breadcrumbContainer}>
        <Breadcrumb pageContext={pageContext} />
      </div>
      <div css={blogPanelContainer}>
        {blogPosts.map(
          (edge) =>
            edge &&
            edge.node && <BlogPostPanel post={edge.node} key={edge.node.slug} />
        )}
      </div>
      <div css={paginationContainer}>
        <Pagination pageContext={pageContext} />
      </div>
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
