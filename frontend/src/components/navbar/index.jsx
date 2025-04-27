import React, { useEffect, useRef } from "react";
import { Fragment } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../api/users";
import { toast } from "react-toastify";
import "./navbar.css";

const Header = () => {
  const token = localStorage.getItem("token");

  const { data, refetch } = useGetCurrentUserQuery(undefined, { skip: !token });

  // Fetch data only when token is available
  useEffect(() => {
    if (token) {
      // When token is present, refetch the user data (in case you just logged in)
      refetch();
    }
  }, [token, refetch]);

  const user = data?.user;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    toast.success("Logged out successfully");
  };

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
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {/* 
<----------------- Showing Logout Button If the user is logged in ----------------->
*/}
            {user?.email ? (
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
                  variant="danger"
                >
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                {/* <NavLink className="nav-link" to="/register">
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
            {user?.img_src && (
              <img className="display-pic ms-3" src={user?.img_src} alt="" />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
