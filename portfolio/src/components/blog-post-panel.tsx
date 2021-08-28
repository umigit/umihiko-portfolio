import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { colors } from '../styles/colors';
import { useMediaQuery } from 'react-responsive';
import { Portfolio_BlogPostType } from '../../types/graphql-types';

const panelContainer = css`
  width: 100%;
  display: flex;

  a {
    width: 100%;
    text-decoration: none;
  }
`;

const panel = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background-color: ${colors.alphaBlack};
  color: ${colors.white};
`;

const imageContainer = css`
  width: 100%;
  position: relative;

  ::before {
    content: '';
    display: block;
    padding-bottom: calc(100% / 1.91);
  }
`;

const image = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const text = css`
  width: 100%;
  min-height: 160px;
  padding: 0.5rem 0.5rem 2.5rem;
  flex: 1;
  position: relative;

  h1 {
    font-size: 1.25rem;
    white-space: pre-wrap;
  }

  p {
    margin-top: 0.5rem;
    font-size: 1rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const category = css`
  margin-top: 0.5rem 0;
  border-left: 0.25rem solid ${colors.orange};
  position: absolute;
  bottom: 0.5rem;

  a {
    color: ${colors.white};
  }

  div:before {
    content: '';
    margin-right: 0.25rem;
  }
`;

type BlogPostPanelType = Pick<
  Portfolio_BlogPostType,
  'image' | 'category' | 'slug' | 'title' | 'introduction' | 'publishedAt'
>;

export const BlogPostPanel: React.FC<{ post: BlogPostPanelType }> = ({
  post,
}) => {
  const imageTitle = post?.image?.title || 'no image';
  const imageUrl = post?.image?.url || '../images/noimage.png';

  return (
    <div css={panelContainer} key={post.slug}>
      <Link to={`/blog/entry/${post.slug}`}>
        <div css={panel}>
          <div css={imageContainer}>
            <img css={image} src={imageUrl} alt={imageTitle} />
          </div>
          <div css={text}>
            <h1>{post.title}</h1>
            <p>{post.introduction}</p>
            <div css={category}>
              <Link to={`/blog/category/${post.category}`}>
                <div>{post.category}</div>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
