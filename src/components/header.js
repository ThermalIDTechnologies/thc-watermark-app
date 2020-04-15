// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { HeaderContainer } from "./styles/StyledHeader"

const Header = () => (
  <HeaderContainer>
    <div>
      <a href="https://thclabelsolutions.com">
        <img
          alt="The House of Custom Logo"
          src="https://res.cloudinary.com/crjars/image/upload/c_scale,f_auto,q_auto:best,w_180/v1580234191/thc-logo_300x.png"
        />
      </a>
    </div>
  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
