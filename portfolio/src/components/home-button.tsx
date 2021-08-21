import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

export const HomeButton: React.FC = () => {
  return (
    <Link to='/'>
      <StaticImage height={60} src='../images/umihiko_logo.png' alt='logo' />
    </Link>
  );
};
