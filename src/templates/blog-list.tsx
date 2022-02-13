import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { css } from '@emotion/react';
import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
import { BlogPostPanel } from '../components/blog-post-panel';
import { Pagination } from '../components/pagination';
import { MobilePagination } from '../components/mobile-pagination';
import { Breadcrumb } from '../components/breadcrumb';
import { useMediaQuery } from 'react-responsive';
import { mobile, tablet, PC } from '../styles/media-query';
import { GetBlogPostsQuery, SitePageContext } from '../../types/graphql-types';

const breadcrumbContainer = css`
  width: 100%;
  max-width: 1280px;
  padding: 0px 30px;
  margin: 0 auto;
`;

const blogPanelList = css`
  width: 100%;
  max-width: 1280px;
  padding: 0px 15px 113px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  @media ${mobile} {
    padding: 0px 10px 67px;
  }
`;

const blogPanelListMobile = css`
  width: 100%;
  max-width: 1280px;
  padding: 0px 10px 67px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

const blogPanelContainer = css`
  width: calc(100% / 3);
  padding: 15px;

  @media ${tablet} {
    width: calc(100% / 2);
    padding: 15px;
  }

  @media ${mobile} {
    width: 100%;
    padding: 10px 0;
  }
`;

const blogPanelContainerTablet = css`
  width: calc(100% / 2);
  padding: 15px;
`;

const blogPanelContainerMobile = css`
  width: 100%;
  padding: 10px 0;
`;

const paginationContainer = css`
  padding: 30px 0px 45px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  @media ${mobile} {
    padding: 15px 0px 20px;
    bottom: 60px;
  }
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
  const isMobile = useMediaQuery({ query: mobile });
  const isTablet = useMediaQuery({ query: tablet });
  const isPC = useMediaQuery({ query: PC });
  const title = `記事一覧：${pageContext.category || '全カテゴリ'}`;

  if (!blogPosts || !currentPage) {
    return (
      <Layout pathname={location.pathname}>
        <p>Sorry! Something wrong this page. Try again later.</p>
      </Layout>
    );
  }

  return (
    <>
      <SEO pathname={location.pathname} title={title} />
      <Layout pathname={location.pathname}>
        {/* Bleadcrumb */}
        <div css={breadcrumbContainer}>
          <Breadcrumb pageContext={pageContext} />
        </div>

        {/* Panel List */}
        <div css={blogPanelList}>
          {blogPosts.map(
            (edge) =>
              edge?.node && (
                <div css={blogPanelContainer} key={edge.node.slug}>
                  <BlogPostPanel post={edge.node} />
                </div>
              )
          )}
        </div>

        {/* Pagination */}
        <div css={paginationContainer}>
          {isMobile && <MobilePagination pageContext={pageContext} />}
          {(isTablet || isPC) && <Pagination pageContext={pageContext} />}
        </div>
      </Layout>
    </>
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
