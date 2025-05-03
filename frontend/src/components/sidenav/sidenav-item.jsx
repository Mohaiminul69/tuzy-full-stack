import { Link } from "react-router-dom";
import React from "react";

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

export default SideNavItem;
