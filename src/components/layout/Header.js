import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
      <header style={headerStyle}>
        <h1>Miran IoT sääasema</h1>
        <Link to="/" style={linkStyle}>Sääasema</Link> - <Link to="/portfolio" style={linkStyle}>Portfolio</Link>
      </header>
    )
}
const headerStyle = {
  background: '#333333',
  color: '#ffffff',
  textAlign: 'center',
  position: 'static',
  top: '0px',
  width: '100%',
  padding: '10px'
}

const linkStyle = {
  color:'#ffffff',
  textDecoration:'none'
}

export default Header;