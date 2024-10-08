import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../Managers/UserProfileManager";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          Tabloid
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/tags">Tags</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/categories">Categories</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/posts">Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/myposts">My Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/user">Users</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            {isLoggedIn ? (
              <NavItem>
                <a
                  aria-current="page"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
