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

  const metaTitle = title || site?.siteMetadata?.title!;
  const metaDescription = description || site?.siteMetadata?.description!;
  const metaImage = image ? image : site?.siteMetadata?.image!;
  const metaUrl = `${site?.siteMetadata?.url!}${pathname}`;
  const metaType = article ? 'article' : 'website';

  return (
    <Helmet title={metaTitle}>
      <html prefix='og: http://ogp.me/ns#' />
      <meta name='description' content={metaDescription} />
      <meta name='image' content={metaImage} />
      <meta property='og:site_name' content='Umihiko' />
      <meta property='og:type' content={metaType} />
      <meta property='og:url' content={metaUrl} />
      <meta property='og:title' content={metaTitle} />
      <meta property='og:description' content={metaDescription} />
      <meta name='og:image' content={metaImage} />
      {/* twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={metaTitle} />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:image' content={metaImage} />
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
