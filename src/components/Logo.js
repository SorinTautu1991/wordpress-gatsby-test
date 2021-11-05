import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

const StyledImgLogo = styled.img`
  width: 4vw;
  height: 7vh;
  border-radius: 70%;
`;

const Logo = () => {
  const {
    allWordpressWpLogo: { edges },
  } = useStaticQuery(graphql`
    {
      allWordpressWpLogo {
        edges {
          node {
            url {
              source_url
            }
            id
          }
        }
      }
    }
  `);
  return <StyledImgLogo src={edges[0].node.url.source_url} alt="logo" />;
};

export default Logo;
