import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import { css } from '@emotion/react';
import { Layout } from '../components/layout';
import { SideMenu } from '../components/side-menu';
import { Markdown } from '../components/markdown';
import { Breadcrumb } from '../components/breadcrumb';
import { useMediaQuery } from 'react-responsive';
import { moblie, tablet } from '../styles/media-query';
import { colors } from '../styles/colors';
import {
  GetBlogPostBySlugQuery,
  SitePageContext,
} from '../../types/graphql-types';

const breadcrumbConatiner = css`
  width: 100%;
  max-width: 1280px;
  padding: 0 30px;
  margin: 0 auto;
`;

const image = css`
  width: 100%;
  margin: 1.5rem 0;
  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
`;

const blogPostContainer = css`
  width: 100%;
  max-width: 1280px;
  padding: 15px 0;
  margin: 0 auto;
  display: flex;
`;

const blogPostPanelContainer = css`
  min-width: 0;
  padding: 0 30px;
  flex: 1;
  position: relative;
`;

const blogPostPanelContainerMobile = css`
  ${blogPostPanelContainer}

  padding: 0 10px;
`;

const heading = css`
  h1 {
    margin: 1rem 0;
  }

  h2 {
    padding: 0.125rem 0.5rem;
    margin: 0.75rem 0;
    border-left: 0.25rem solid ${colors.orange};
  }

  h3 {
    margin: 0.5rem 0;
  }

  h4 {
    margin: 0.25rem 0;
  }

  h5 {
    margin: 0.125rem 0;
  }
`;

const blogPostPanel = css`
  padding: 1rem 2rem 2rem;
  color: ${colors.white};
  background-color: ${colors.alphaBlack};
  ${heading}

  a {
    color: ${colors.orange};
    text-decoration: none;
  }
`;

const blogPostPanelMobile = css`
  ${blogPostPanel}
  padding: 1rem 0.5rem 2rem;
`;

const date = css`
  color: ${colors.gray};
`;

const sideMenuContainer = css`
  width: 360px;
  min-width: 360px;
  padding-right: 30px;
`;

const body = css`
  ${heading}

  p {
    margin-bottom: 1rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  img {
    margin: 1rem 0;
  }

  pre {
    margin: 1rem 0;
    overflow-x: auto;
  }
`;

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();
  return `${month[monthIndex]} ${day}, ${year}`;
};

export type Props = PageProps<GetBlogPostBySlugQuery, SitePageContext>;

const BlogPage: React.FC<Props> = ({ data, location, pageContext }) => {
  const blogPost = data.portfolio.blogPostBySlug;
  const isMobile = useMediaQuery(moblie);
  const isTablet = useMediaQuery(tablet);
  const isPC = !isMobile && !isTablet;

  const blogPostPanelCss = isMobile ? blogPostPanelMobile : blogPostPanel;

  if (!blogPost) {
    return <div></div>;
  }

  return (
    <Layout pathname={location.pathname}>
      {isPC && (
        <div css={breadcrumbConatiner}>
          <Breadcrumb pageContext={pageContext} />
        </div>
      )}
      <div css={blogPostContainer}>
        <div css={isPC ? blogPostPanelContainer : blogPostPanelContainerMobile}>
          <div css={blogPostPanelCss}>
            <p css={date}>
              <span>Last Updated: </span>
              {formatDate(blogPost.updatedAt)}
            </p>
            <h1>{blogPost.title}</h1>
            {blogPost?.image?.url && (
              <div css={image}>
                <img src={blogPost.image.url} />
              </div>
            )}
            <h2>概要</h2>
            <p>{blogPost.introduction}</p>
            <div css={body}>
              <Markdown markdown={blogPost.markdown} />
            </div>
          </div>
        </div>
        {isPC && (
          <div css={sideMenuContainer}>
            <SideMenu pageContext={pageContext} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query GetBlogPostBySlug($slug: String!) {
    portfolio {
      blogPostBySlug(slug: $slug) {
        slug
        category
        title
        introduction
        markdown
        publishedAt
        updatedAt
        image {
          url
          title
        }
      }
    }
  }
`;

export default BlogPage;
