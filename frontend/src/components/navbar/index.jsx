import React, { useEffect, useRef } from "react";
import { Fragment } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../api/users";
import useAuth from "../../hooks/useAuth";
import "./navbar.css";

const Header = () => {
  const customNav = useRef(null);
  const { user, isLoggedIn, logout } = useAuth();
  const { data, refetch } = useGetCurrentUserQuery(undefined, {
    skip: !isLoggedIn,
  });

  const currentUser = data?.user || user;

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn, refetch]);

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
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {currentUser?.email ? (
              <Fragment>
                <NavLink className="nav-link" to="/destination/new">
                  Add Destination
                </NavLink>
                <NavLink className="nav-link" to="/manage">
                  Manage Bookings
                </NavLink>
                <NavLink className="nav-link" to="/myOrders">
                  My Bookings
                </NavLink>
                <Button
                  className="ms-3 btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/80 !py-2 !px-4 !border-gray-900 !capitalize !rounded-sm"
                  onClick={logout}
                >
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
