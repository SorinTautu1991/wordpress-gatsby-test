const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  createRedirect({
    fromPath: "/",
    toPath: "/home",
    redirectInBrowser: true,
    isPermanent: true,
  });
  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            slug
            status
            template
            title
            content
          }
        }
      }
      allWordpressPost {
        edges {
          node {
            id
            slug
            status
            template
            title
            content
          }
        }
      }
    }
  `);

  result.data.allWordpressPage.edges.forEach(page => {
    createPage({
      path: `/${page.node.slug}/`,
      component: path.resolve(`src/templates/page-template.js`),
      context: page.node,
    });
  });

  result.data.allWordpressPost.edges.forEach(post => {
    createPage({
      path: `/post/${post.node.slug}/`,
      component: path.resolve(`src/templates/post-template.js`),
      context: post.node,
    });
  });
};
