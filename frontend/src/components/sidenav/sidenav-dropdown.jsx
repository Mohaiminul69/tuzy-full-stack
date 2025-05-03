import React, { useState } from "react";
import SideNavItem from "./sidenav-item";

const SidenavDropdown = ({ icon, name, options }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <SideNavItem
        icon={icon}
        name={name}
        onClick={() => setShowOptions(!showOptions)}
        extraIcon={
          <i className={`fas fa-chevron-${showOptions ? "up" : "down"}`} />
        }
      />
      {showOptions && options}
    </>
  );
};

export default SidenavDropdown;
