import React from "react";
import { useGetSingleUserQuery } from "../../api/users";
import { useGetSinglePackageQuery } from "../../api/packages";
import { useGetSingleDestinationQuery } from "../../api/destinations";

const ReviewCard = ({ review }) => {
  const { comment, user_id, package_id, destination_id } = review;
  const capitalizedComment = comment.charAt(0).toUpperCase() + comment.slice(1);
  const { data = {} } = useGetSingleUserQuery(user_id);
  const user = data?.user;

  const locationId = package_id || destination_id;
  const callback = package_id
    ? useGetSinglePackageQuery
    : useGetSingleDestinationQuery;

  const { data: location } = callback(locationId);
  const { img_src } = location?.["package"] || location?.["destination"] || {};

  return (
    <div className="review-card">
      <span>
        {user?.first_name} {user?.last_name}
      </span>
      <div className="img-wrapper">
        <img src={img_src} alt="" />
        <div className="comment flex gap-3 items-start">
          {user?.img_src && (
            <img
              className="!w-[30px] !h-[30px] rounded-full border-2 border-white"
              src={user?.img_src}
            />
          )}
          <span className="text-left">- {capitalizedComment}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
