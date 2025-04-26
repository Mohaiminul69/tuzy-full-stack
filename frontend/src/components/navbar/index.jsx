import React, { useEffect, useRef } from "react";
import { Fragment } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
// import useAuth from "./../../Hooks/useAuth";
import "./navbar.css";

const Header = () => {
  // const { user, logOut } = useAuth();
  const user = () => {};
  const logOut = () => {};
  const customNav = useRef(null);

  useEffect(() => {
    const handleScroll = () =>
      (customNav.current.style.background =
        window.scrollY > 70 ? "rgba(27, 27, 27, 0.95)" : "transparent");

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
            <NavLink className="navLink" to="/">
              Home
            </NavLink>
            {/* 
<----------------- Showing Logout Button If the user is logged in ----------------->
*/}
            {user?.email ? (
              <Fragment>
                <NavLink className="navLink" to="/addTour">
                  Add Tour
                </NavLink>
                <NavLink className="navLink" to="/manage">
                  Manage Bookings
                </NavLink>
                <NavLink className="navLink" to="/myOrders">
                  My Bookings
                </NavLink>
                <Button className="ms-3" onClick={logOut} variant="danger">
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink className="navLink" to="/login">
                  Login
                </NavLink>
                {/* <NavLink className="navLink" to="/register">
                  Register
                </NavLink> */}
              </Fragment>
            )}
            {/* 
<----------------------- Showing Display Name of User ----------------------->
 */}
            {user?.displayName && (
              <Navbar.Text className="ms-3 text-white">
                <span>{user.displayName}</span>
              </Navbar.Text>
            )}
            {/* 
<----------------------- Showing User Display Picture ----------------------->
 */}
            {user?.photoURL && (
              <img className="displayPic ms-3" src={user.photoURL} alt="" />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
