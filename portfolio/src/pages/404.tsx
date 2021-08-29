import React from 'react';
import { Link, PageProps } from 'gatsby';
import { css } from '@emotion/react';
import { Layout } from '../components/layout';

const messageContainer = css`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const message = css`
  padding: 0px 10px;
  transform: translateY(-40px);

  h1 {
    margin: 1rem 0;
  }

  p {
    margin: 0.25rem 0;
  }
`;

const NotFoundPage: React.FC<PageProps> = ({ location }) => {
  return (
    <Layout pathname={location.pathname}>
      <title>Not found</title>
      <div css={messageContainer}>
        <div css={message}>
          <h1>Page not found</h1>
          <p>Sorry, something is wrong.</p>
          <p>I hope you find what you're looking for...</p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
