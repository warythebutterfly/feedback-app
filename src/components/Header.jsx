import React from 'react'
import {FaToggleOff, FaToggleOn} from "react-icons/fa"

import PropTypes from 'prop-types'
function Header({bgColor, txtColor, message, reverse, handleReverse}) {
    console.log(reverse)
    const headerStyles = {
        backgroundColor: bgColor,
        color : txtColor
    }
  
  return (
    <header style={headerStyles}>
        <div className='container'>
            <h2>{message}</h2>
            
        </div>
        <button onClick={() => handleReverse(reverse)} style={{backgroundColor: "transparent", border:"none"}} className = "close">
            {!reverse && <FaToggleOff color="#ff6a95" size={35} />}
            {reverse && <FaToggleOn color='#ff6a95' size={35} />}
            </button>
        
    </header>
  )
}

Header.defaultProps = {
    message : "Feedback UI",
    bgColor : 'rgba(0,0,1,0.4)',
    txtColor: '#ff6a95',
    // handleToggle : true
}

Header.propTypes = {
    message : PropTypes.string,
    bgColor : PropTypes.string,
    txtColor : PropTypes.string,
    handleToggle: PropTypes.bool
}

export default Header

