import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { css } from '@emotion/react';
import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
import { SideMenu } from '../components/side-menu';
import { Markdown } from '../components/markdown';
import { Breadcrumb } from '../components/breadcrumb';
import { useMediaQuery } from 'react-responsive';
import { moblie, tablet, PC } from '../styles/media-query';
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

const imageContainer = css`
  width: 100%;
  margin: 1.5rem 0;
  position: relative;

  ::before {
    content: '';
    display: block;
    padding-bottom: calc(100% / 1.91);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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

    code {
      margin: 0 0.125rem;
      padding: 0rem 0.25rem;
      border-radius: 4px;
      background-color: rgb(60, 60, 60);
      display: inline-block;
      transform: translateY(-1px);
    }
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
  const isPC = useMediaQuery(PC);
  const imageTitle = blogPost?.image?.title || 'no image';
  const imageUrl = blogPost?.image?.url || '../images/noimage.png';

  if (!blogPost) {
    return <div></div>;
  }

  const blogBody = (
    <div>
      <p css={date}>
        <span>Last Updated: </span>
        {formatDate(blogPost.updatedAt)}
      </p>
      <h1>{blogPost.title}</h1>

      <div css={imageContainer}>
        <img src={imageUrl} alt={imageTitle} />
      </div>

      <h2>概要</h2>
      <p>{blogPost.introduction}</p>
      <div css={body}>
        <Markdown markdown={blogPost.markdown} />
      </div>
    </div>
  );

  return (
    <Layout pathname={location.pathname}>
      <SEO
        pathname={location.pathname}
        title={blogPost.title}
        description={blogPost.introduction}
        image={imageUrl}
        article={true}
      />
      {isMobile && (
        <div>
          <div css={blogPostContainer}>
            <div css={blogPostPanelContainerMobile}>
              <div css={blogPostPanelMobile}>{blogBody}</div>
            </div>
          </div>
        </div>
      )}

      {(isTablet || isPC) && (
        <div>
          <div css={breadcrumbConatiner}>
            <Breadcrumb pageContext={pageContext} />
          </div>

          <div css={blogPostContainer}>
            <div css={blogPostPanelContainer}>
              <div css={blogPostPanel}>{blogBody}</div>
            </div>
            {isPC && (
              <div css={sideMenuContainer}>
                <SideMenu pageContext={pageContext} />
              </div>
            )}
          </div>
        </div>
      )}
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
