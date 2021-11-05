import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import Logo from "./Logo";

const SiteInfoWrapper = styled.div`
  flex-grow: 1;
  color: white;
  margin: auto 0;
`;

const SiteTitle = styled.div`
  font-weight: bold;
`;

const WrapperLogo = styled.div`
  max-width: 20vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SiteInfo = () => {
  const {
    allWordpressSiteMetadata: { edges },
  } = useStaticQuery(graphql`
    {
      allWordpressSiteMetadata {
        edges {
          node {
            name
            description
          }
        }
      }
    }
  `);

  return (
    <SiteInfoWrapper>
      <WrapperLogo>
        <Logo />
        <div>
          <SiteTitle>{edges[0].node.name}</SiteTitle>
          <div>{edges[0].node.description}</div>
        </div>
      </WrapperLogo>
    </SiteInfoWrapper>
  );
};

export default SiteInfo;
