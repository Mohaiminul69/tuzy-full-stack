import React from "react";
import { Link } from "react-router-dom";
import "./destination.css";

const DestinationCard = ({ destination }) => {
  const { name, img_src, short_description, id } = destination;
  return (
    <div className="destination-card">
      <div
        style={{
          background: `url("${img_src}") no-repeat center center/cover`,
        }}
        className="destination-img"
      />
      <h5>{name}</h5>
      <p className="text-xs text-gray-300">{short_description}</p>
      <Link to={`destination/details/${id}`}>
        <button className="btn btn-danger btn-sm !font-bold !text-black !bg-amber-400 hover:!bg-amber-300 !px-2 !border-gray-900">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default DestinationCard;
