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
    <Helmet
      title={metaTitle}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          property: 'og:site_name',
          content: 'Umihiko',
        },
        {
          property: 'og:type',
          content: metaType,
        },
        {
          property: 'og:url',
          content: metaUrl,
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: metaImage,
        },
      ]}
    >
      <html prefix='og: http://ogp.me/ns#' />
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
