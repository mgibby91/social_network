/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// gatsby-node.js
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  console.log("page path: ", page.path);
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/user-profiles/)) {
    page.matchPath = "/user-profiles/*"
    
    // Update the page.
    createPage(page)
  }
}