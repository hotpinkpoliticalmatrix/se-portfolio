import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/sections/hero"
import About from "../components/sections/about"
import Proficiencies from "../components/sections/proficiencies"
import Projects from "../components/sections/projects"
import Contact from "../components/sections/contact"
import { splashScreen } from "../config"
import Knowledgable from "../components/sections/knowledgable"

const IndexPage = ({ data }) => (
  <Layout splashScreen={splashScreen}>
    <SEO title="Stacey Eliuk | Fullstack Engineer" />
    <Hero content={data.hero.edges} />
    <About content={data.about.edges} />
    <Proficiencies content={data.proficiencies.edges} />
    <Knowledgable content={data.knowledgable.edges} />
    <Projects content={data.projects.edges} />
    <Contact content={data.contact.edges} />
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  {
    hero: allMdx(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          body
          frontmatter {
            greetings
            title
            subtitlePrefix
            subtitle
            icon {
              childImageSharp {
                fluid(maxWidth: 60, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    about: allMdx(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 400, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    proficiencies: allMdx(
      filter: { fileAbsolutePath: { regex: "/proficiencies/" } }
    ) {
      edges {
        node {
          exports {
            shownItems
            proficiencies {
              name
              icon {
                childImageSharp {
                  fixed(width: 20, height: 20, quality: 90) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
          frontmatter {
            title
            subtitle
          }
        }
      }
    }
    knowledgable: allMdx(
      filter: { fileAbsolutePath: { regex: "/proficiencies/" } }
    ) {
      edges {
        node {
          exports {
            shownItems
            knowledgable {
              name
              icon {
                childImageSharp {
                  fixed(width: 20, height: 20, quality: 90) {
                    srcWebp
                    src
                    width
                    height
                  }
                }
              }
            }
          }
          frontmatter {
            title
            subtitle
          }
        }
      }
    }
    projects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { visible: { eq: "true" } }
      }
      sort: { fields: [frontmatter___position], order: ASC }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
            category
            emoji
            external
            github
            screenshot {
              childImageSharp {
                fluid(maxWidth: 400, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
            position
            buttonVisible
            buttonUrl
            buttonText
          }
        }
      }
    }
    contact: allMdx(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
            name
            email
            profileImage {
              childImageSharp {
                fluid(maxWidth: 400, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
