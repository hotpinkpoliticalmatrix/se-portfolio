import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { motion, useAnimation } from "framer-motion"

import { detectMobileAndTablet, isSSR } from "../../utils"
import { useOnScreen } from "../../hooks"
import ContentWrapper from "../../styles/ContentWrapper"
import Button from "../../styles/Button"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 6rem;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    margin-left: 44px;
    margin-right: 44px;
    flex-direction: column;
    justify-content: center;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-right: 30px;
      padding-left: 30px;
    }
  }
`

const StyledInterests = styled.div`
  display: grid;
  /* Calculate how many columns are needed, depending on interests count */
  grid-template-columns: repeat(
    ${({ itemCount }) => Math.ceil(itemCount / 2)},
    13rem
  );
  grid-template-rows: repeat(6, auto);
  grid-auto-flow: column;
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 8px;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  /* Workaround: https://stackoverflow.com/questions/38993170/last-margin-padding-collapsing-in-flexbox-grid-layout */
  &::after {
    content: "";
    width: ${({ itemCount }) =>
      Math.ceil(itemCount / 2) % 2 === 1 ? "17.125rem" : "2.5rem"};
  }
  @media (min-width: 890px) {
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 16.625rem);
    overflow: visible;
    padding: 0;
    .interest {
      width: 16.625rem;
    }
  }
  /* Show scrollbar if desktop and wrapper width > viewport width */
  @media (hover: hover) {
    &::-webkit-scrollbar {
      display: block;
      -webkit-appearance: none;
    }

    &::-webkit-scrollbar:horizontal {
      height: 0.8rem;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border: 0.2rem solid white;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &::-webkit-scrollbar-track {
      background-color: #fff;
      border-radius: 8px;
    }
  }

  .interest {
    width: 13rem;
    height: 3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
    border: 0.125rem solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius};
    .icon {
      margin-right: 0.5rem;
    }
    @media (min-width: 890px) {
      width: 16.625rem;
    }
  }
`

const Knowledgable = ({ content }) => {
  const { exports, frontmatter } = content[0].node
  const { shownItems, knowledgable } = exports

  const [shownInterests, setShownInterests] = useState(shownItems)
  const ref = useRef()
  const onScreen = useOnScreen(ref)
  const iControls = useAnimation()
  const bControls = useAnimation()

  useEffect(() => {
    // If mobile or tablet, show all interests initially
    // Otherwise interests.mdx will determine how many interests are shown
    // (isSSR) is used to prevent error during gatsby build
    if (!isSSR && detectMobileAndTablet(window.innerWidth)) {
      setShownInterests(knowledgable.length)
    }
  }, [knowledgable])

  useEffect(() => {
    const sequence = async () => {
      if (onScreen) {
        // i receives the value of the custom prop - can be used to stagger
        // the animation of each "interest" element
        await iControls.start(i => ({
          opacity: 1,
          scaleY: 1,
          transition: { delay: i * 0.1 },
        }))
        await bControls.start({ opacity: 1, scaleY: 1 })
      }
    }
    sequence()
  }, [onScreen, shownInterests, iControls, bControls])

  const showMoreItems = () => setShownInterests(shownInterests + 4)

  return (
    <StyledSection id="knowledgable">
      <StyledContentWrapper>
        <h3 className="section-title">{frontmatter.subtitle}</h3>
        <StyledInterests itemCount={knowledgable.length} ref={ref}>
          {knowledgable.slice(0, shownInterests).map(({ name, icon }, key) => (
            <motion.div
              className="interest"
              key={key}
              custom={key}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={iControls}
            >
              <Img className="icon" fixed={icon.childImageSharp.fixed} /> {name}
            </motion.div>
          ))}
          {shownInterests < knowledgable.length && (
            <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={bControls}>
              <Button
                onClick={() => showMoreItems()}
                type="button"
                textAlign="left"
                color="primary"
              >
                + Load more
              </Button>
            </motion.div>
          )}
        </StyledInterests>
      </StyledContentWrapper>
    </StyledSection>
  )
}

Knowledgable.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        exports: PropTypes.shape({
          knowledgable: PropTypes.array.isRequired,
          shownItems: PropTypes.number.isRequired,
        }).isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Knowledgable
