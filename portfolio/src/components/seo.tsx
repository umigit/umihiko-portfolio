import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { SeoQuery } from '../../types/graphql-types';

type Props = {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  pathname: string;
};

export const SEO: React.FC<Props> = ({
  title,
  description,
  image,
  article,
  pathname,
}) => {
  const { site }: Required<SeoQuery> = useStaticQuery(query);

  const metaTitle = title || site?.siteMetadata?.title;
  const metaDescription = description || site?.siteMetadata?.description;
  const metaImage = image ? image : site?.siteMetadata?.image;
  const metaUrl = `${site?.siteMetadata?.url}${pathname}`;
  const metaArticle = article || false;

  return (
    <Helmet title={metaTitle!}>
      <meta name='description' content={metaDescription!} />
      <meta name='image' content={metaImage!} />
      {metaUrl && <meta property='og:url' content={metaUrl!} />}
      {metaArticle && <meta property='og:type' content='article' />}
      {metaTitle && <meta property='og:title' content={metaTitle} />}
      {metaDescription && (
        <meta property='og:description' content={metaDescription} />
      )}
      {metaImage && <meta name='og:image' content={metaImage} />}
      {/* twitter */}
      {metaTitle && <meta name='twitter:title' content={metaTitle} />}
      {metaDescription && (
        <meta name='twitter:description' content={metaDescription} />
      )}
      {metaImage && <meta name='twitter:image' content={metaImage} />}
    </Helmet>
  );
};

export const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        description
        url
        image
      }
    }
  }
`;
