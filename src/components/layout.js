import React from "react";
import MainMenu from "./MainMenu";
import styled, { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Zen+Kurenaido&display=swap');
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const LayoutWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const Layout = ({ children }) => {
  const {
    allWordpressWpFavicon: { edges },
  } = useStaticQuery(graphql`
    {
      allWordpressWpFavicon {
        edges {
          node {
            url {
              source_url
            }
          }
        }
      }
    }
  `);
  return (
    <>
      <Helmet>
        <link rel="icon" href={edges[0].node.url.source_url} />
      </Helmet>
      <GlobalStyles />
      <MainMenu />
      <LayoutWrapper>{children}</LayoutWrapper>
    </>
  );
};

export default Layout;
