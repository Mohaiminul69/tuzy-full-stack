import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./sidenav.css";

const SideNavItem = ({ icon, name, link, onClick, className, extraIcon }) => (
  <Link to={link}>
    <div className={`sidenav-item ${className}`} onClick={onClick}>
      <div className="sidenav-icon">{icon}</div>
      <div className="flex justify-between w-full pr-[28px]">
        <span>{name}</span>
        {extraIcon && <span>{extraIcon}</span>}
      </div>
    </div>
  </Link>
);

const Sidenav = ({ currentUser }) => {
  const { logout } = useAuth();
  const isAdmin = currentUser?.admin;
  const [showOptions, setShowOptions] = useState(false);

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
            <SideNavItem
              icon={<i className="fas fa-box"></i>}
              name="add tour"
              onClick={() => setShowOptions(!showOptions)}
              extraIcon={
                <i
                  className={`fas fa-chevron-${showOptions ? "up" : "down"}`}
                />
              }
            />
            {showOptions && (
              <>
                <SideNavItem name="destination" link="/destination/new" />
                <SideNavItem name="package" link="/package/new" />
              </>
            )}
            <SideNavItem
              icon={<i className="fas fa-trash-alt"></i>}
              name="manage tours"
              link="/manage-tours"
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
