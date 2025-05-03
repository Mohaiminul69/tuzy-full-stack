import React, { useEffect, useRef } from "react";
import { Fragment } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./navbar.css";

const Header = ({ currentUser, isDashboard }) => {
  const customNav = useRef(null);
  const { logout } = useAuth();

  useEffect(() => {
    const backgroundColor = isDashboard ? "#1b1b1b" : "transparent";
    customNav.current.style.background = backgroundColor;

    const handleScroll = () =>
      (customNav.current.style.background =
        window.scrollY > 70 ? "rgba(27, 27, 27, 0.95)" : backgroundColor);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fragment>
      <Navbar
        fixed="top"
        ref={customNav}
        variant="light"
        collapseOnSelect
        expand="lg"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              className="logo"
              src="https://i.ibb.co/2tD3QrN/logo.png"
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {currentUser?.email ? (
              <Fragment>
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
                <Button
                  className="ms-3 btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/80 !py-2 !px-4 !border-gray-900 !capitalize !rounded-sm"
                  onClick={logout}
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </Fragment>
            )}
            {currentUser?.first_name && (
              <Navbar.Text className="ms-3 text-white">
                <span>{`${currentUser.first_name} ${currentUser?.last_name}`}</span>
              </Navbar.Text>
            )}
            {currentUser?.img_src && (
              <img
                className="display-pic ms-3"
                src={currentUser?.img_src}
                alt=""
              />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
