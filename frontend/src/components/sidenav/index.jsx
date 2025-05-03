import React from "react";
import useAuth from "../../hooks/useAuth";
import SideNavItem from "./sidenav-item";
import SidenavDropdown from "./sidenav-dropdown";
import "./sidenav.css";

const Sidenav = ({ currentUser }) => {
  const { logout } = useAuth();
  const isAdmin = currentUser?.admin;

  return (
    <div className="sidenav">
      <div className="sidenav-items">
        <SideNavItem
          icon={<i className="fas fa-home"></i>}
          name="home"
          link="/"
        />
        <SideNavItem
          icon={
            currentUser?.img_src ? (
              <img
                className="w-[25px] h-[25px] rounded-full border-2"
                src={currentUser?.img_src}
              />
            ) : (
              <i className="fas fa-user"></i>
            )
          }
          name="profile"
          link="/profile"
        />
        {isAdmin ? (
          <>
            <SideNavItem
              icon={<i className="fas fa-user-cog"></i>}
              name="make admin"
              link="/make-admin"
            />
            <SideNavItem
              icon={<i className="fas fa-trash-alt"></i>}
              name="Manage All Orders"
              link="/manage-orders"
            />
            <SidenavDropdown
              icon={<i className="fas fa-box"></i>}
              name="add tours"
              options={
                <>
                  <SideNavItem name="destination" link="/destination/new" />
                  <SideNavItem name="package" link="/package/new" />
                  <SideNavItem name="gallary image" link="/gallary-image/new" />
                </>
              }
            />
            <SidenavDropdown
              icon={<i className="fas fa-trash-alt"></i>}
              name="manage tours"
              options={
                <>
                  <SideNavItem name="destination" link="/destination/delete" />
                  <SideNavItem name="package" link="/package/delete" />
                  <SideNavItem
                    name="gallary image"
                    link="/gallary-image/delete"
                  />
                </>
              }
            />
          </>
        ) : (
          <>
            <SideNavItem
              icon={<i className="far fa-credit-card"></i>}
              name="make payment"
              link="/make-payment"
            />
            <SideNavItem
              icon={<i className="fas fa-boxes"></i>}
              name="my bookings"
              link="/my-bookings"
            />
          </>
        )}
      </div>
      <div className="sidenav-items">
        <SideNavItem
          className="bg-[#a93939] hover:!bg-[#a93939]/80"
          icon={<i className="fas fa-sign-out-alt"></i>}
          name="logout"
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default Sidenav;
