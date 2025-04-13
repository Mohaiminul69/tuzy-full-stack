import React from "react";
import { Link } from "react-router-dom";
import "./destination.css";

const DestinationCard = ({ location }) => {
  const { name, img_src, short_description, id } = location;
  return (
    <div
      style={{ background: `url("${img_src}") no-repeat center center/cover` }}
      className="locationCard"
    >
      <h4>{name}</h4>
      <p className="text-xs text-gray-300">{short_description}</p>
      <Link to={`/details/${id}`}>
        <button className="btn btn-danger btn-sm">Book Now</button>
      </Link>
    </div>
  );
};

export default DestinationCard;
