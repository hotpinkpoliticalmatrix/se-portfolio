import React, { useState } from "react"
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components"
import "typeface-roboto"

import Context from "../context/"
import Theme from "../styles/Theme"
import GlobalStyle from "../styles/GlobalStyle"
import Header from "./header"
import Footer from "./footer"

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]')
}

const Layout = ({ children, splashScreen }) => {
  // you can determine whether you want to have a splashScreen
  // for each page in the respective page component
  // if splashScreen = false, we set isIntroDone = true to skip
  // the splashScreen
  const [state, setState] = useState({
    isIntroDone: splashScreen ? false : true,
  })

  return (
    <Context.Provider value={{ state, setState }}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </ThemeProvider>
    </Context.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  splashScreen: PropTypes.bool.isRequired,
}

export default Layout
