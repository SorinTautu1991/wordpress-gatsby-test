const path = require("path");
const slash = require("slash");

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
            wordpress_id
            date(formatString: "Do MMM YYYY HH:mm")
            excerpt
            slug
            title
            content
          }
        }
      }
      allWordpressWpPortfolio {
        edges {
          node {
            id
            title
            excerpt
            content
            slug
            featured_media {
              source_url
            }
            acf {
              portfolio_url
            }
          }
        }
      }
    }
  `);

  result.data.allWordpressPage.edges.forEach(page => {
    createPage({
      path: `/${page.node.slug}/`,
      component:
        page.node.template === "portfolio_under_content.php"
          ? path.resolve(`src/templates/portfolio-under-content.js`)
          : path.resolve(`src/templates/page-template.js`),
      context: page.node,
    });
  });

  result.data.allWordpressWpPortfolio.edges.forEach(portfolio => {
    createPage({
      path: `/portfolio/${portfolio.node.slug}/`,
      component: path.resolve(`src/templates/portfolio-template.js`),
      context: portfolio.node,
    });
  });

  const posts = result.data.allWordpressPost.edges;
  const postsPerPage = 2;
  const nrOfPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: nrOfPages }).forEach((page, index) => {
    createPage({
      path: index === 0 ? "/blog" : `/blog/${index + 1}`,
      component: path.resolve(`src/templates/post-template.js`),
      context: {
        posts: posts.slice(
          index * postsPerPage,
          index * postsPerPage + postsPerPage
        ),
        numberOfPages: nrOfPages,
        currentPage: index + 1,
      },
    });
  });

  posts.forEach(post => {
    createPage({
      path: `/post/${post.node.slug}`,
      component: slash(path.resolve(`src/templates/page-template.js`)),
      context: post.node,
    });
  });
};
