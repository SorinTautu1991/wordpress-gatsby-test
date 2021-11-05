import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styled from "styled-components";
import SiteInfo from "./SiteInfo";

const MainMenuWrapper = styled.div`
  display: flex;
  background-color: rgb(3, 27, 77);
`;

const MenuItem = styled(Link)`
  color: white;
  display: block;
  padding: 8px 16px;
`;

const MainMenuInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  width: 960px;
  height: 100%;
`;

const MainMenu = () => {
  const {
    allWordpressWpApiMenusMenusItems: { edges },
  } = useStaticQuery(graphql`
    query MyQuery {
      allWordpressWpApiMenusMenusItems(filter: { name: { eq: "Main menu" } }) {
        edges {
          node {
            name
            items {
              object_slug
              title
            }
          }
        }
      }
    }
  `);

  return (
    <MainMenuWrapper>
      <MainMenuInner>
        <SiteInfo />
        {edges[0].node.items.map(item => {
          return (
            <MenuItem to={`/${item.object_slug}`} key={item.title}>
              {item.title}
            </MenuItem>
          );
        })}
      </MainMenuInner>
    </MainMenuWrapper>
  );
};

export default MainMenu;
