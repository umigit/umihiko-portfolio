import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { colors } from '../styles/colors';
import PersonIcon from '@material-ui/icons/Person';
import SubjectIcon from '@material-ui/icons/Subject';

const navLink = css`
  width: 100%;
  text-align: center;
  background-color: ${colors.alphaBlack};
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;

  a {
    color: ${colors.white};
    font-size: 0.75rem;
    text-decoration: none;
  }
`;

const button = css`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MobileNav: React.FC = () => {
  return (
    <div css={navLink}>
      <Link to='/about/'>
        <div css={button}>
          <PersonIcon fontSize='large' />
          <p>About</p>
        </div>
      </Link>
      <Link to='/blog/'>
        <div css={button}>
          <SubjectIcon fontSize='large' />
          <p>Blog</p>
        </div>
      </Link>
    </div>
  );
};
