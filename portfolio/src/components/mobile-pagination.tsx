import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import { colors } from '../styles/colors';
import { SitePageContext } from '../../types/graphql-types';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LastPageIcon from '@material-ui/icons/LastPage';

const pagination = css`
  height: 2rem;
  padding: 0 10px;
  display: flex;
  justify-content: center;
`;

const navigation = css`
  margin: 0 0.25rem;
  flex: 1;

  a {
    color: ${colors.white};
  }
`;

const navigationSmall = css`
  ${navigation}
  flex:0 0 2rem;
`;

const link = css`
  height: 100%;
  text-align: center;

  svg {
    height: 100%;
  }
`;

const disabled = css`
  pointer-events: none;

  a {
    color: transparent;
  }
`;

const page = css`
  width: 90px;
  margin: 0 0.25rem;
  font-size: 1rem;
  line-height: 2rem;
  text-align: center;
  color: ${colors.white};
`;

const pageButton = css``;

type Props = { pageContext: SitePageContext };

export const MobilePagination: React.FC<Props> = ({ pageContext }) => {
  const currentPage = pageContext.currentPage;
  const numberOfPages = pageContext.numberOfPages || 1;
  const prefix = pageContext.prefix;

  if (!currentPage) {
    return <div></div>;
  }

  const previousPagePath =
    prefix + (currentPage > 2 ? `/${currentPage - 1}` : ``);
  const nextPagePath =
    prefix +
    (currentPage < numberOfPages ? `/${currentPage + 1}` : `/${numberOfPages}`);
  const firstPagePath = `${prefix}`;
  const lastPagePath = prefix + (currentPage > 2 ? `/${numberOfPages}` : ``);

  const previous = [navigation, pageContext.hasPreviousPage ? null : disabled];
  const next = [navigation, pageContext.hasNextPage ? null : disabled];

  return (
    <div css={pagination}>
      <div css={navigationSmall}>
        <Link to={firstPagePath}>
          <div css={link}>
            <FirstPageIcon />
          </div>
        </Link>
      </div>
      <div css={previous}>
        <Link to={previousPagePath}>
          <div css={link}>
            <NavigateBeforeIcon />
          </div>
        </Link>
      </div>

      <div css={page}>
        <div css={pageButton}>{`Page ${currentPage}`}</div>
      </div>

      <div css={next}>
        <Link to={nextPagePath}>
          <div css={link}>
            <NavigateNextIcon />
          </div>
        </Link>
      </div>

      <div css={navigationSmall}>
        <Link to={lastPagePath}>
          <div css={link}>
            <LastPageIcon />
          </div>
        </Link>
      </div>
    </div>
  );
};
