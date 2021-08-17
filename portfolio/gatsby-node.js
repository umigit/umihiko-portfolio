const path = require('path');
const groupBy = require('lodash/groupBy');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const query = `
    query GetAllBlogPosts {
      portfolio {
        blogPosts {
          edges {
            cursor
            node {
              slug
              category
              title
            }
          }
        }
      }
    }
  `;

  const response = await graphql(query);
  const edges = response.data.portfolio.blogPosts.edges;
  const pageSize = 6;
  const numberOfPages = Math.ceil(edges.length / pageSize);

  // create blog list page
  [...Array(numberOfPages)].forEach((_, index) => {
    const prefix = `/blog`;
    const page = index + 1;
    const cursorEdge = edges[pageSize * index - 1];
    const after = cursorEdge ? cursorEdge.cursor : '';

    createPage({
      path: page === 1 ? prefix : `${prefix}/${page}`,
      component: path.resolve('./src/templates/blog-list.tsx'),
      context: {
        category: null,
        prefix: prefix,
        currentPage: page,
        numberOfPages: numberOfPages,
        first: pageSize,
        after: after,
        hasNextPage: page < numberOfPages,
        hasPreviousPage: page > 1,
      },
    });
  });

  // create blog list by category
  const edgesByCategory = groupBy(edges, (edge) => edge.node.category);
  const categories = Object.keys(edgesByCategory);
  console.log(categories);
  categories.forEach((key) => {
    const edges = edgesByCategory[key];
    const numberOfPages = Math.ceil(edges.length / pageSize);

    [...Array(numberOfPages)].forEach((_, index) => {
      const prefix = `/blog/category/${key}`;
      const page = index + 1;
      const cursorEdge = edges[pageSize * index - 1];
      const after = cursorEdge ? cursorEdge.cursor : '';

      createPage({
        path: page === 1 ? prefix : `${prefix}/${page}`,
        component: path.resolve('./src/templates/blog-list.tsx'),
        context: {
          category: key,
          prefix: prefix,
          currentPage: page,
          numberOfPages: numberOfPages,
          first: pageSize,
          after: after,
          hasNextPage: page < numberOfPages,
          hasPreviousPage: page > 1,
        },
      });
    });
  });

  // create blog post page
  edges.forEach((edge, index) => {
    const prefix = `/blog/entry`;
    const previousPath =
      index > 0 ? `${prefix}/${edges[index - 1].node.slug}` : null;
    const nextPath =
      index < edges.length - 1
        ? `${prefix}/${edges[index + 1].node.slug}`
        : null;

    createPage({
      path: `${prefix}/${edge.node.slug}`,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        title: edge.node.title,
        prefix: prefix,
        category: edge.node.category,
        categories: categories,
        slug: edge.node.slug,
        previousPath,
        nextPath,
      },
    });
  });
};
