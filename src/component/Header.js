import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderMenu from './Header/HeaderMenu'

import {NavLink} from 'react-router-dom'


 const Header = () => {
  

  return (
    <div>
      <AppBar style={{backgroundColor: '#0B0C10'}} position="static">
        <Toolbar>
            <HeaderMenu />
          <div className="header_title">
          <NavLink exact to="/" id="NavLink" >
            StreamShow
          </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header