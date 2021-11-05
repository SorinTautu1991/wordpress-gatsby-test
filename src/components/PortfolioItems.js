import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styled from "styled-components";

const PortfolioItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PortfolioItem = styled.div`
  width: 300px;
  border: 1px solid #efefef;
  padding: 16px;
  margin: 16px;
`;

const PortfolioImage = styled.img`
  max-width: 100%;
`;

const PortfolioItems = () => {
  const {
    allWordpressWpPortfolio: { edges },
  } = useStaticQuery(graphql`
    {
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
          }
        }
      }
    }
  `);
  return (
    <PortfolioItemsWrapper>
      {edges.map(portfolio => {
        return (
          <PortfolioItem key={portfolio.node.id}>
            <h2>{portfolio.node.item}</h2>
            <PortfolioImage
              src={portfolio.node.featured_media.source_url}
              alt="Thumbnail"
            />
            <div dangerouslySetInnerHTML={{ __html: portfolio.node.excerpt }} />
            <Link to={`/portfolio/${portfolio.node.slug}`}>Read more</Link>
          </PortfolioItem>
        );
      })}
    </PortfolioItemsWrapper>
  );
};

export default PortfolioItems;
