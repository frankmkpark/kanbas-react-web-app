import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <NavLink className="nav-link" activeClassName="active" to="/project/home">
        Home
      </NavLink>
      <NavLink className="nav-link" activeClassName="active" to="/project/search">
        Search
      </NavLink>
      <NavLink className="nav-link" activeClassName="active" to="/project/signin">
        Signin
      </NavLink>
      <NavLink className="nav-link" activeClassName="active" to="/project/signup">
        Signup
      </NavLink>
      <NavLink className="nav-link" activeClassName="active" to="/project/account">
        Account
      </NavLink>
    </div>
  );
};

export default Nav;
