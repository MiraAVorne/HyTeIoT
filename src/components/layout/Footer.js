import React from 'react';

function Footer() {
    return (
        <header style={footerStyle}>
            &copy; Mira
        </header>
    )
}
    
const footerStyle = {
  background: '#333333',
  color: '#ffffff',
  textAlign: 'center',
  position: 'fixed',
  bottom: '0px',
  width: '100%'
}
export default Footer;