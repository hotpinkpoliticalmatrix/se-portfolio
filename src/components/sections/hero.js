import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import Context from "../../context/"
import ContentWrapper from "../../styles/ContentWrapper"
import Underlining from "../../styles/Underlining"
import Social from "../social"
import SplashScreen from "../splashScreen"
import Theme from "../../styles/Theme"
import king from "../../content/hero/king.jpg"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    overflow: hidden;
    // background: #c33764; /* fallback colour. Make sure this is just one solid colour. */
    // background: -webkit-linear-gradient(
    //   rgba(29, 38, 113, 0.8),
    //   rgba(195, 55, 100, 0.8)
    // );
    // background: linear-gradient(
    //   rgba(32, 30, 65, 0.8),
    //   rgba(195, 55, 100, 0.8)
    // ); /* The least supported option. */

    min-height: 60vh;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 6rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-bottom: 4rem;
    }
    .text {
      position: absolute;
      top: 100px;
      left: 70px;
      width: 100%;
    }

    .greetings {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 40px;
    }

    .emoji {
      margin-left: 0.75rem;
      width: 2.2rem;
      height: 2.2rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-left: 1rem;
        width: 3rem;
        height: 3rem;
      }
    }
    .king {
      opacity: 0.25;
      width: 100vw;
      max-height: 600px;
      object-fit: cover;
      filter: contrast(150%);
    }
    .title {
      margin-bottom: 1.5rem;
      font-size: 50px;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-bottom: 0;
      }
    }
    .subtitle {
      margin-top: -0.6rem;
      margin-left: 0.8rem;
      font-size: 23px;
    }
    .description {
      font-size: 1rem;
      margin-bottom: 2rem;
      margin-left: 1.7rem;
    }
    .description span {
      background-color: white;
    }
  }
`

const AnimatedUnderlining = motion.custom(Underlining)

const Hero = ({ content }) => {
  const { frontmatter, body } = content[0].node
  const { isIntroDone } = useContext(Context).state

  // Controls to orchestrate animations of greetings, emoji, social profiles, underlining
  const gControls = useAnimation()
  const eControls = useAnimation()
  const sControls = useAnimation()
  const uControls = useAnimation()

  // Start Animations after the splashScreen sequence is done
  useEffect(() => {
    const pageLoadSequence = async () => {
      if (isIntroDone) {
        eControls.start({
          rotate: [0, -10, 12, -10, 9, 0, 0, 0, 0, 0, 0],
          transition: { duration: 2.5, loop: 3, repeatDelay: 1 },
        })
        await gControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 0.4 },
        })
        await sControls.start({
          opacity: 1,
          x: 0,
        })
        // Animate underlining to hover state
        await uControls.start({
          boxShadow: `inset 0 -2rem 0 ${Theme.colors.secondary}`,
          transition: { delay: 0.4, ease: "circOut" },
        })
      }
    }
    pageLoadSequence()
  }, [isIntroDone, eControls, gControls, sControls, uControls])

  return (
    <StyledSection id="hero">
      {!isIntroDone && <SplashScreen />}
      <StyledContentWrapper>
        <img className="king" src={king} alt="king" />
        <div className="text">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={gControls}>
            <h1 className="title">
              <div className="greetings">
                <span>{frontmatter.greetings}</span>
                <motion.div
                  animate={eControls}
                  style={{ originX: 0.7, originY: 0.7 }}
                >
                  <Img
                    className="emoji"
                    fluid={frontmatter.icon.childImageSharp.fluid}
                  />
                </motion.div>
              </div>
              <span>{frontmatter.title}</span>
            </h1>
            <h2 className="subtitle">
              {frontmatter.subtitlePrefix}{" "}
              {/* Hover state color can be set in useEffect hook */}
              <AnimatedUnderlining animate={uControls} color="tertiary" big>
                <span>{frontmatter.subtitle}</span>
              </AnimatedUnderlining>
            </h2>
            <div className="description">
              <span>
                <MDXRenderer>{body}</MDXRenderer>
              </span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={sControls}>
            <Social fontSize=".95rem" padding=".3rem 1.25rem" width="auto" />
          </motion.div>
        </div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

Hero.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Hero
